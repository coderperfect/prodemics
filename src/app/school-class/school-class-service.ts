import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { SchoolClass } from './school-class';
import { environment } from '../../environments/environment';

@Service()
export class SchoolClassService {
    
    private readonly classesApiBaseUrl = `${environment.HOST_URL}/api/classes`;

    private http = inject(HttpClient);

    getAll() {
        return this.http.get<SchoolClass[]>(this.classesApiBaseUrl);
    }

    create(schoolClass: SchoolClass) {
        return this.http.post<SchoolClass>(this.classesApiBaseUrl, schoolClass);
    }

    update(id: number, schoolClass: SchoolClass) {
        return this.http.put<SchoolClass>(`${this.classesApiBaseUrl}/${id}`, schoolClass);
    }

    delete(id: number) {
        return this.http.delete(`${this.classesApiBaseUrl}/${id}`);
    }
}
