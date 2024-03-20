// Import library yang ditambahkan
import { UrlGetAllBukuByKodeProdi, UrlGetRekapCitasiBukuPertahunByProdi, UrlGetRekapCitasiBukuPertahunByJenisByProdi, requestOptionsGet } from "../controller/template.js";

// Conditional untuk D4 TI dan yg bukan
document.addEventListener("DOMContentLoaded", function() {
    const prodiSelect = document.getElementById("prodiSelect");
    const rekapGrafikD4TI = document.getElementById("rekapGrafikD4TI");
    const grafikAllProdi = document.getElementById("grafikAllProdi");

    prodiSelect.addEventListener("change", function() {
        if (prodiSelect.value === "") {
            rekapGrafikD4TI.hidden = false;
            grafikAllProdi.hidden = false;
        } else if (prodiSelect.value === "14") {
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
    fetch(UrlGetRekapCitasiBukuPertahunByProdi + "?kode_prodi=14", requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            const labels = data.data.map(item => "Tahun" + item.tahun_terbit);
            const citasi = data.data.map(item => item.jumlah_kutipan);
            
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
    fetch(UrlGetRekapCitasiBukuPertahunByJenisByProdi +  "?kode_prodi=14", requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            const datasets = {};

            data.data.forEach(item => {
                if (!datasets[item.jenis_publikasi]) {
                    datasets[item.jenis_publikasi] = {};
                }
                datasets[item.jenis_publikasi][item.tahun_terbit] = item.jumlah_kutipan;
            });

            const tahun = ["2019", "2020", "2021", "2022"];

            const colors = Object.keys(datasets).map((_, index) => {
                return `hsl(${(index * 360) / Object.keys(datasets).length}, 100%, 50%)`;
            });

            const chartData = Object.keys(datasets).map((jenis_publikasi, index) => {
                return {
                    label: jenis_publikasi,
                    backgroundColor: colors[index],
                    borderColor: colors[index],
                    hoverBackgroundColor: colors[index],
                    hoverBorderColor: colors[index],
                    data: tahun.map(tahun => datasets[jenis_publikasi][tahun] || 0) 
                };
            });

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
                        position: 'bottom' 
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
    var myChart;
    function getDataFromAPI(id) {
        fetch(UrlGetRekapCitasiBukuPertahunByProdi + `?kode_prodi=${id}`, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            const sortedData = data.data.sort((a, b) => a.tahun_terbit - b.tahun_terbit);
            createLineChart(sortedData);
        })
        .catch(error => console.error('Error:', error));
    }

    function createLineChart(data) {
        const labels = data.map(item => item.tahun_terbit);
        const kutipanData = data.map(item => item.jumlah_kutipan);
        if (myChart) {
            myChart.destroy();
        }
        var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
        gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
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
    document.getElementById('prodiSelect').addEventListener('change', function() {
        const selectedProdiId = this.value;
        getDataFromAPI(selectedProdiId);
    });
});

// Fetch Data Kontributor dengan jumlah citasinya
document.getElementById('prodiSelect').addEventListener('change', function() {
    const selectedProdiId = this.value;

    fetch(UrlGetAllBukuByKodeProdi + `?kode_prodi=${selectedProdiId}`, requestOptionsGet)
        .then(response => response.json())
        .then(data => {
            let totalKutipanPerDosen = {};
            data.data.forEach(publikasi => {
                if (!totalKutipanPerDosen.hasOwnProperty(publikasi.nama_dosen)) {
                    totalKutipanPerDosen[publikasi.nama_dosen] = 0;
                }
                totalKutipanPerDosen[publikasi.nama_dosen] += publikasi.jumlah_kutipan;
            });

            let sortedTotalKutipanPerDosen = Object.entries(totalKutipanPerDosen).sort((a, b) => b[1] - a[1]);

            let tableData = "";
            sortedTotalKutipanPerDosen.forEach(([namaDosen, totalKutipan], index) => {
                tableData += `
                    <tr>
                        <td hidden></td>
                        <td style="text-align: center; vertical-align: middle">${index + 1}</td>
                        <td style="text-align: center; vertical-align: middle">${namaDosen}</td>
                        <td style="text-align: center; vertical-align: middle">${totalKutipan}</td>
                    </tr>`;
            });
            document.getElementById("tablebodyKontributor").innerHTML = tableData;
        })
        .catch(error => {
            console.log('Error:', error);
    });
});