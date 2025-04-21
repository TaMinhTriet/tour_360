import createApiClient from "./api.service";
class HangHoaService {
    constructor(baseUrl=import.meta.env.VITE_API_BASE_URL + "/api/book"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/")).data;
    }
    async searchByName(tenhh) {
        return (await this.api.get("/", { params: { tenhh } })).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
}
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async deleteALL() {
        return (await this.api.delete('/')).data;
    }
    async getALLSanPhamTheoLoai(idloai) {
        return (await this.api.get(`/loaihang/${idloai}`)).data;
    }
    async getById(id){
        return (await this.api.get(`/${id}`)).data;
    }
}
       
export default new HangHoaService();