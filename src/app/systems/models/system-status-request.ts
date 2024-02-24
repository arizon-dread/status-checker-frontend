export interface SystemStatusRequest {
    responseMatch: string
    alertBody: string
    alertEmail?: string
    alertUrl?: string
    callUrl: string
    callBody?: string
    httpMethod: string
    clientCertId?: number
    name: string
    id?: number
}
