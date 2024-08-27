import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('create')
  async createReportTask(@Body() body: { serviceName: string, endpoint: string, headers: string[] }) {
    const id = await this.reportService.createReportTask(body.serviceName, body.endpoint, body.headers);
    return { id };
  }

  @Get('status/:id')
  async getReportStatus(@Param('id') id: string) {
    const status = await this.reportService.getReportStatus(+id);
    return status;
  }
}