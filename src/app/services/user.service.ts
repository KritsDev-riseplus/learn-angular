import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  roleName: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  fullName?: string;
  roleName: string;
}

export interface UpdateUserRequest {
  email?: string;
  fullName?: string;
  roleName?: string;
}

export interface SignerDTO {
  name: string;
  status: string;
}

export interface SignatureStatusRequest {
  applicationId: string;
  certType: string;
  companyName: string;
  companyRegNo: string;
  signatureStatus: string;
  signers: SignerDTO[];
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly USER_ENDPOINT = "/api/users";

  constructor(private http: HttpService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_ENDPOINT);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.USER_ENDPOINT}/${id}`);
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.USER_ENDPOINT, user);
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.USER_ENDPOINT}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.USER_ENDPOINT}/${id}`);
  }

  sendEmail(userId: number, subject: string, content: string): Observable<any> {
    return this.http.post<any>(`${this.USER_ENDPOINT}/${userId}/email`, {
      subject,
      content,
    });
  }

  sendPaymentEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/payment-email`,
      {},
    );
  }

  sendApplicationReviewEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/application-review-email`,
      {},
    );
  }

  sendApplicationConfirmationEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/application-confirmation-email`,
      {},
    );
  }

  sendSignatureStatusEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/signature-status-email`,
      {},
    );
  }

  sendSigningCompletedEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/signing-completed-email`,
      {},
    );
  }

  sendCertificateEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/cert-email`,
      {},
    );
  }

  sendCertificateRejectionEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/cert-rejection-email`,
      {},
    );
  }

  sendCertificateDownloadEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/cert-download-email`,
      {},
    );
  }

  sendNewAdminEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/new-admin-email`,
      {},
    );
  }

  sendNewPasswordEmail(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.USER_ENDPOINT}/${userId}/new-password-email`,
      {},
    );
  }
}
