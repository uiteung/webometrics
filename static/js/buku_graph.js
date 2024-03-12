import { UrlGetRekapCitasiBukuPertahun, UrlGetRekapCitasiBukuPertahunByJenis, requestOptionsGet } from "./controller/template.js";

document.addEventListener("DOMContentLoaded", function() {
    const prodiSelect = document.getElementById("prodiSelect");
    const rekapGrafikD4TI = document.getElementById("rekapGrafikD4TI");
    const grafikAllProdi = document.getElementById("grafikAllProdi");

    prodiSelect.addEventListener("change", function() {
        if (prodiSelect.value === "14") { // D4 Teknik Informatika
            rekapGrafikD4TI.hidden = false;
            grafikAllProdi.hidden = true;
        } else {
            rekapGrafikD4TI.hidden = true;
            grafikAllProdi.hidden = false;
        }
    });
});

// Fetch data untuk rekap jumlah citasi publikasi per tahun
document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan data dari endpoint API
    fetch("https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/rekapcitasi/get?kode_prodi=14", requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            // Mengubah data response menjadi array labels dan data citasi
            const labels = data.data.map(item => "Tahun" + item.tahun_terbit);
            const citasi = data.data.map(item => item.jumlah_kutipan);
            
            // Membuat Pie chart dengan data yang diambil
            new Chart(document.getElementById("chartjs-pie"), {
                type: "pie",
                data: {
                    labels: labels,
                    datasets: [{
                        data: citasi,
                        backgroundColor: [
                            window.theme.primary,
                            window.theme.warning,
                            window.theme.danger,
                            window.theme.info,
                            "#dee2e6"
                        ],
                        borderColor: "transparent"
                    }]
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: true
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Fetch data untuk rekap jumlah citasi publikasi per tahun berdasarkan jenis publikasi
document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan data dari endpoint API
    fetch("https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku/citasijenistahun/get?kode_prodi=14", requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            // Membuat objek untuk menyimpan data berdasarkan jenis publikasi
            const datasets = {};

            // Mengelompokkan data berdasarkan jenis publikasi
            data.data.forEach(item => {
                if (!datasets[item.jenis_publikasi]) {
                    datasets[item.jenis_publikasi] = {};
                }
                datasets[item.jenis_publikasi][item.tahun_terbit] = item.jumlah_kutipan;
            });

            // Menyiapkan data untuk sumbu x
            const tahun = ["2019", "2020", "2021", "2022"];

            // Warna yang akan digunakan untuk setiap jenis publikasi
            const colors = Object.keys(datasets).map((_, index) => {
                return `hsl(${(index * 360) / Object.keys(datasets).length}, 100%, 50%)`;
            });

            // Mengubah objek datasets menjadi array untuk digunakan dalam Chart.js
            const chartData = Object.keys(datasets).map((jenis_publikasi, index) => {
                return {
                    label: jenis_publikasi,
                    backgroundColor: colors[index],
                    borderColor: colors[index],
                    hoverBackgroundColor: colors[index],
                    hoverBorderColor: colors[index],
                    data: tahun.map(tahun => datasets[jenis_publikasi][tahun] || 0) // Menggunakan 0 jika data tidak tersedia
                };
            });

            // Membuat Bar chart dengan data yang diambil
            new Chart(document.getElementById("chartjs-bar"), {
                type: "bar",
                data: {
                    labels: tahun,
                    datasets: chartData
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: true,
                        position: 'bottom' // Menampilkan legenda di bawah chart
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: true
                            },
                            stacked: false,
                            ticks: {
                                stepSize: 20
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
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });