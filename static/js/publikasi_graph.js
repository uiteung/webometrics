import { requestOptionsGet } from "./controller/template.js";

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
    fetch('https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/rekapcitasi/get?kode_prodi=14', requestOptionsGet)
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
    fetch('https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/citasijenistahun/get?kode_prodi=14', requestOptionsGet)
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

// Fetch data untuk line chart per prodi
document.addEventListener("DOMContentLoaded", function() {
    var myChart; // Variabel untuk menyimpan instansiasi Chart

    // Fungsi untuk mendapatkan data dari API
    function getDataFromAPI(id) {
        fetch(`https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/rekapcitasi/get?kode_prodi=${id}`, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            // Menyusun data berdasarkan tahun terkecil hingga tahun terbesar
            const sortedData = data.data.sort((a, b) => a.tahun_terbit - b.tahun_terbit);
            // Memanggil fungsi untuk membuat grafik setelah mendapatkan data
            createLineChart(sortedData);
        })
        .catch(error => console.error('Error:', error));
    }

    // Fungsi untuk membuat grafik garis
    function createLineChart(data) {
        // Mendapatkan label (tahun_terbit) dan data (jumlah_kutipan) dari respons API
        const labels = data.map(item => item.tahun_terbit);
        const kutipanData = data.map(item => item.jumlah_kutipan);

        // Menghapus instansiasi Chart sebelumnya jika ada
        if (myChart) {
            myChart.destroy();
        }

        // Mendapatkan konteks dari elemen canvas
        var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
        gradient.addColorStop(1, "rgba(215, 227, 244, 0)");

        // Line chart
        myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Jumlah Kutipan",
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: window.theme.primary,
                    data: kutipanData
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
                            stepSize: 1000
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
    }

    // Mendengarkan perubahan pada dropdown pilih prodi
    document.getElementById('prodiSelect').addEventListener('change', function() {
        const selectedProdiId = this.value;
        getDataFromAPI(selectedProdiId);
    });
});
