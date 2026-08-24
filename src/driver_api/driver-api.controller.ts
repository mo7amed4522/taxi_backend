import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as fastify from 'fastify';
import { RestJwtAuthGuard } from './auth/rest-jwt-auth.guard';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { createWriteStream, promises } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { join } from 'path';
const pump = promisify(pipeline);

import { version } from 'package.json';
import { MediaEntity } from './../entities/media.entity';
import { DriverEntity } from './../entities/driver.entity';
import { CryptoService } from './../crypto.service';
import { SharedDriverService } from './../order/shared-driver.service';
import { TransactionAction } from './../entities/enums/transaction-action.enum';
import { DriverRechargeTransactionType } from './../entities/enums/driver-recharge-transaction-type.enum';
import { TransactionStatus } from './../entities/enums/transaction-status.enum';

@Controller()
export class DriverAPIController {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    private cryptoService: CryptoService,
    private sharedDriverService: SharedDriverService,
  ) {}

  @Get()
  async defaultPath(@Res() res: fastify.FastifyReply) {
    res.send(`✅ Driver API microservice running.\nVersion: ${version}`);
  }

  @Get('payment_result')
  async verifyPayment(
    @Req() req: fastify.FastifyRequest<{ Querystring: { token: string } }>,
    @Res() res: fastify.FastifyReply,
  ) {
    const token = req.query.token;
    const decrypted = await this.cryptoService.decrypt(token);
    if (decrypted.userType == 'client') {
      if (decrypted.status == 'success') {
        await this.sharedDriverService.rechargeWallet({
          driverId: decrypted.userId,
          amount: decrypted.amount,
          currency: decrypted.currency,
          refrenceNumber: decrypted.transactionNumber,
          action: TransactionAction.Recharge,
          rechargeType: DriverRechargeTransactionType.InAppPayment,
          paymentGatewayId: decrypted.gatewayId,
          status: TransactionStatus.Done,
        });
        res.send(
          'Transaction successful. Close this page and go back to the app.',
        );
      } else {
        res.send(
          "Transaction wasn't successful. You can go back to the app and redo this.",
        );
      }
    }
  }

  @Get('success_message')
  async successMessage(
    @Req()
    req: fastify.FastifyRequest<{
      Querystring: { id_order: string };
      Body: { posted_data: string };
    }>,
    @Res() res: fastify.FastifyReply,
  ) {
    res.send('Transaction successful. Close this page and go back to the app.');
  }

  @Post('upload_profile')
  @UseGuards(RestJwtAuthGuard)
  async upload(@Request() req: any, @Res() res: fastify.FastifyReply) {
    const data = await req.file();
    const dir = 'uploads';
    await promises.mkdir(dir, { recursive: true });
    const _fileName = join(dir, `${new Date().getTime()}-${data.filename}`);
    await pump(data.file, createWriteStream(_fileName));
    const insert = await this.mediaRepository.save({ address: _fileName });
    await this.driverRepository.update((req as unknown as any).user.id, {
      mediaId: insert.id,
    });
    insert.id = insert.id.toString() as unknown as any;
    res.code(200).send(insert);
  }

  @Post('upload_document')
  @UseGuards(RestJwtAuthGuard)
  async uploadDocuement(@Request() req: any, @Res() res: fastify.FastifyReply) {
    const data = await req.file();
    const dir = 'uploads';
    await promises.mkdir(dir, { recursive: true });
    const _fileName = join(dir, `${new Date().getTime()}-${data.filename}`);
    await pump(data.file, createWriteStream(_fileName));
    const insert = await this.mediaRepository.save({
      address: _fileName,
      driverDocumentId: (req as unknown as any).user.id,
    });
    insert.id = insert.id.toString() as unknown as any;
    res.code(200).send(insert);
  }
}
