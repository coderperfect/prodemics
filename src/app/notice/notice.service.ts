import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

interface Notice {
    id: number,
    title: string,
    description: string,
    createdAt: string
}

interface NoticesResponse {
  notices: Notice[],
  currentPage: number,
  totalPages: number
}

@Injectable({ providedIn: 'root' })
export class NoticeService {
  constructor(private httpClient: HttpClient) {}

  getNotice(pageNumber?: number) {
    if(!pageNumber)
      return this.httpClient.get<NoticesResponse>(`${environment.HOST_URL}/notice/list`);
    
    return this.httpClient.get<NoticesResponse>(`${environment.HOST_URL}/notice/list?pageNumber=${pageNumber}`);
  }

  addNotice(title: string, description: string, createdAt: string) {
    return this.httpClient.post<Notice>(`${environment.HOST_URL}/admin/notice/add`, {title, description, createdAt});
  }
}
