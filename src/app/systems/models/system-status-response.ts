export interface SystemStatusResponse {
    alertBody: string
    alertEmail: string
    alertHasBeenSent: boolean
    alertUrl: string
    callBody: string
    callStatus: string
    callUrl: string
    certExpirationDays: number
    certStatus: string
    clientCertId: number
    httpMethod: string
    id: number
    lastFailTime: string
    lastOkTime: string
    message: string
    name: string
    responseMatch: string
    status: string
}
