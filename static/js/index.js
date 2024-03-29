import { requestOptionsGet, UrlGetCitasiPerprodi, UrlGeCitasiBukuPerprodi, UrlGetRekapCitasiPublikasiPertahun, UrlGetAllPublikasi, UrlGetAllBuku } from "./controller/template.js";

// Fetch Data Get All Publikasi
fetch(UrlGetAllPublikasi, requestOptionsGet)
  .then(response => response.json())
  .then(data => {
    let totalKutipan = 0;
    data.data.forEach(publikasi => {
      totalKutipan += publikasi.jumlah_kutipan;
    });
    document.getElementById('jumlahPublikasi').textContent = totalKutipan;
  })
.catch(error => console.error('Error:', error));

// Fetch Data Get All Buku
fetch(UrlGetAllBuku, requestOptionsGet)
  .then(response => response.json())
  .then(data => {
    let totalKutipan = 0;
    data.data.forEach(buku => {
      totalKutipan += buku.jumlah_kutipan;
    });
    document.getElementById('jumlahBuku').textContent = totalKutipan;
  })
.catch(error => console.error('Error:', error));

// Untuk Fetch Data in Line Chart
document.addEventListener("DOMContentLoaded", function() {
    fetch(UrlGetRekapCitasiPublikasiPertahun, requestOptionsGet)
        .then((response) => response.json())
        .then((data) => {
            data.data.sort((a, b) => parseInt(a.tahun_terbit) - parseInt(b.tahun_terbit));
            const years = data.data.map((entry) => entry.tahun_terbit);
            const citationCounts = data.data.map((entry) => entry.jumlah_kutipan);
            var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
            var gradient = ctx.createLinearGradient(0, 0, 0, 225);
            gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
            gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: years,
                    datasets: [{
                        label: "Jumlah Kutipan",
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: window.theme.primary,
                        data: citationCounts
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        intersect: false
                    },
                    hover: {
                        intersect: true
                    },
                    plugins: {
                        filler: {
                            propagate: false
                        }
                    },
                    scales: {
                        xAxes: [{
                            reverse: true,
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                stepSize: 100
                            },
                            display: true,
                            borderDash: [3, 3],
                            gridLines: {
                                color: "rgba(0,0,0,0.0)"
                            }
                        }]
                    }
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});

// Fetch Data Jumlah Kutipan Terbanyak Per Prodi
document.addEventListener("DOMContentLoaded", function() {
    fetch(UrlGetCitasiPerprodi, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            const prodiData = [
                { kode_prodi: 14, nama: "D4 Teknik Informatika" },
                { kode_prodi: 13, nama: "D3 Teknik Informatika" },
                { kode_prodi: 23, nama: "D3 Manajemen Informatika" },
                { kode_prodi: 33, nama: "D3 Akuntansi" },
                { kode_prodi: 34, nama: "D4 Akuntansi Keuangan" },
                { kode_prodi: 43, nama: "D3 Manajemen Pemasaran" },
                { kode_prodi: 44, nama: "D4 Manajemen Perusahaan" },
                { kode_prodi: 53, nama: "D3 Administrasi Logistik" },
                { kode_prodi: 54, nama: "D4 Logistik Bisnis" },
                { kode_prodi: 74, nama: "D4 Logistik Niaga" },
                { kode_prodi: 81, nama: "S1 Manajemen Transportasi" },
                { kode_prodi: 82, nama: "S1 Manajemen Logistik" },
                { kode_prodi: 83, nama: "S1 Bisnis Digital" },
                { kode_prodi: 84, nama: "S1 Sains Data" },
                { kode_prodi: 85, nama: "S1 Manajemen Rekayasa" },
                { kode_prodi: 101, nama: "S2 Manajemen Logistik" }
            ];
            data.data.sort((a, b) => b.jumlah_kutipan - a.jumlah_kutipan);
            const labels = data.data.map(entry => {
                const prodi = prodiData.find(prodi => prodi.kode_prodi === entry.kode_prodi);
                return prodi ? prodi.nama : '';
            });
            const kutipan = data.data.map(entry => entry.jumlah_kutipan);
            new Chart(document.getElementById("chartjs-dashboard-bar"), {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Jumlah Kutipan",
                        backgroundColor: window.theme.primary,
                        borderColor: window.theme.primary,
                        hoverBackgroundColor: window.theme.primary,
                        hoverBorderColor: window.theme.primary,
                        data: kutipan,
                        barPercentage: 0.75,
                        categoryPercentage: 1
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: true
                            },
                            stacked: false,
                            ticks: {
                                stepSize: 100
                            }
                        }],
                        xAxes: [{
                            stacked: false,
                            gridLines: {
                                color: "transparent"
                            }
                        }]
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Fetch Data Jumlah Kutipan Buku Terbanyak Per Prodi
document.addEventListener("DOMContentLoaded", function() {
    fetch(UrlGeCitasiBukuPerprodi, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            const prodiData = [
                { kode_prodi: 14, nama: "D4 Teknik Informatika" },
                { kode_prodi: 13, nama: "D3 Teknik Informatika" },
                { kode_prodi: 23, nama: "D3 Manajemen Informatika" },
                { kode_prodi: 33, nama: "D3 Akuntansi" },
                { kode_prodi: 34, nama: "D4 Akuntansi Keuangan" },
                { kode_prodi: 43, nama: "D3 Manajemen Pemasaran" },
                { kode_prodi: 44, nama: "D4 Manajemen Perusahaan" },
                { kode_prodi: 53, nama: "D3 Administrasi Logistik" },
                { kode_prodi: 54, nama: "D4 Logistik Bisnis" },
                { kode_prodi: 74, nama: "D4 Logistik Niaga" },
                { kode_prodi: 81, nama: "S1 Manajemen Transportasi" },
                { kode_prodi: 82, nama: "S1 Manajemen Logistik" },
                { kode_prodi: 83, nama: "S1 Bisnis Digital" },
                { kode_prodi: 84, nama: "S1 Sains Data" },
                { kode_prodi: 85, nama: "S1 Manajemen Rekayasa" },
                { kode_prodi: 101, nama: "S2 Manajemen Logistik" }
            ];
            data.data.sort((a, b) => b.jumlah_kutipan - a.jumlah_kutipan);
            const labels = data.data.map(entry => {
                const prodi = prodiData.find(prodi => prodi.kode_prodi === entry.kode_prodi);
                return prodi ? prodi.nama : '';
            });
            const kutipan = data.data.map(entry => entry.jumlah_kutipan);
            new Chart(document.getElementById("chartjs-buku-bar"), {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Jumlah Kutipan",
                        backgroundColor: window.theme.primary,
                        borderColor: window.theme.primary,
                        hoverBackgroundColor: window.theme.primary,
                        hoverBorderColor: window.theme.primary,
                        data: kutipan,
                        barPercentage: 0.75,
                        categoryPercentage: 0.5
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: true
                            },
                            stacked: false,
                            ticks: {
                                stepSize: 100
                            }
                        }],
                        xAxes: [{
                            stacked: false,
                            gridLines: {
                                color: "transparent"
                            }
                        }]
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});