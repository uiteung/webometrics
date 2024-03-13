// Import Libray yg dibutuhkan
import { token } from "./cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Membuat objek konfigurasi untuk permintaan GET
export let requestOptionsGet = {
  method : 'GET',
  headers : header
}

// Endpoint Get All
export let UrlGetAllPublikasi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi";
export let UrlGetRekapCitasiPublikasiPertahun = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/rekapcitasi";
export let UrlGetRekapCitasiPublikasiPertahunByProdi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/rekapcitasi/get";
export let UrlGetRekapCitasiPublikasiPertahunByJenis = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/citasijenistahun";
export let UrlGetRekapCitasiPublikasiPertahunByJenisByProdi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/citasijenistahun/get";
export let UrlGetAllPublikasiByKodeProdi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/get";
export let UrlGetCitasiPerprodi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/citasiprodi";

export let UrlGetAllBuku = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku";
export let UrlGetRekapCitasiBukuPertahunByJenis = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/citasijenistahun";
export let UrlGetRekapCitasiBukuPertahunByJenisByProdi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/citasijenistahun/get";
export let UrlGetAllBukuByKodeProdi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/get";
export let UrlGetRekapCitasiBukuPertahun = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/rekapcitasi";
export let UrlGetRekapCitasiBukuPertahunByProdi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/rekapcitasi/get";
export let UrlGeCitasiBukuPerprodi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/citasiprodi";