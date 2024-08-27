import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


 class ReportController {
    async getReport(req: Request, res: any): Promise<void>{
        const report = await prisma.report.findMany()
        res.json(report)
    }
}



export default new ReportController()