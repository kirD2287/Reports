import { Module } from '@nestjs/common';
import { ReportService } from './report/report.service';
import { ReportController } from './report/report.controller';
import { PrismaService } from 'src/prisma.service'
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ReportController],
  providers: [ReportService, PrismaService],
})
export class AppModule {}