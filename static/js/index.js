import { requestOptionsGet, UrlGetRekapCitasiPublikasiPertahun, UrlGetAllPublikasi, UrlGetAllBuku } from "./controller/template.js";

// Fetch Data Get All Publikasi
fetch(UrlGetAllPublikasi, requestOptionsGet)
  .then(response => response.json())
  .then(data => {
    // Menghitung jumlah total kutipan
    let totalKutipan = 0;
    data.data.forEach(publikasi => {
      totalKutipan += publikasi.jumlah_kutipan;
    });

    // Menampilkan jumlah total kutipan pada elemen dengan id "jumlahPublikasi"
    document.getElementById('jumlahPublikasi').textContent = totalKutipan;
  })
.catch(error => console.error('Error:', error));

// Fetch Data Get All Buku
fetch(UrlGetAllBuku, requestOptionsGet)
  .then(response => response.json())
  .then(data => {
    // Menghitung jumlah total kutipan
    let totalKutipan = 0;
    data.data.forEach(buku => {
      totalKutipan += buku.jumlah_kutipan;
    });

    // Menampilkan jumlah total kutipan pada elemen dengan id "jumlahBuku"
    document.getElementById('jumlahBuku').textContent = totalKutipan;
  })
.catch(error => console.error('Error:', error));

// Fetch Data Get Publikasi Internasional & Nasional
fetch(UrlGetAllPublikasi, requestOptionsGet)
  .then(response => response.json())
  .then(data => {
    // Menghitung jumlah total data dengan jenis publikasi "Scopus" dan yang bukan "Scopus"
    let jurnalInterCount = 0;
    let jurnalNasionalCount = 0;
    data.data.forEach(publikasi => {
      if (publikasi.ranking === 'Scopus') {
        jurnalInterCount++;
      } else {
        jurnalNasionalCount++;
      }
    });

    // Menampilkan jumlah total data pada elemen dengan id "jurnalInter" dan "jurnalNasional"
    document.getElementById('jurnalInter').textContent = jurnalInterCount;
    document.getElementById('jurnalNasional').textContent = jurnalNasionalCount;
  })
.catch(error => console.error('Error:', error));

// Untuk Fetch Data in Line Chart
document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from API
    fetch(UrlGetRekapCitasiPublikasiPertahun, requestOptionsGet)
        .then((response) => response.json())
        .then((data) => {
            // Extract years and citation counts from the data
            const years = data.data.map((entry) => entry.tahun_terbit);
            const citationCounts = data.data.map((entry) => entry.jumlah_kutipan);

            // Get chart canvas context
            var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
            var gradient = ctx.createLinearGradient(0, 0, 0, 225);
            gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
            gradient.addColorStop(1, "rgba(215, 227, 244, 0)");

            // Create line chart
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
                                stepSize: 100 // You may want to adjust the step size according to your data
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