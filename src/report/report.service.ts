import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { HttpService } from '@nestjs/axios';
import * as XLSX from 'xlsx';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async createReportTask(serviceName: string, endpoint: string, headers: string[]): Promise<number> {
    const report = await this.prisma.report.create({
      data: { name: serviceName, status: 'pending' },
    });

    this.generateReport(report.id, serviceName, endpoint, headers);

    return report.id;
  }

  private async generateReport(id: number, serviceName: string, endpoint: string, headers: string[]) {
    try {
      const { data } = await firstValueFrom(this.http.get(endpoint));
      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
      const filePath = `./reports/report_${id}.xlsx`;
      XLSX.writeFile(workbook, filePath);

      await this.prisma.report.update({
        where: { id },
        data: { status: 'completed', filePath },
      });
    } catch (error) {
      await this.prisma.report.update({
        where: { id },
        data: { status: 'failed' },
      });
    }
  }

  async getReportStatus(id: number) {
    return this.prisma.report.findUnique({
      where: { id },
      select: { status: true, filePath: true },
    });
  }
}