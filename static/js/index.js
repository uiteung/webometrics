import { requestOptionsGet, UrlGetRekapCitasiPublikasiPertahun } from "./controller/template.js";

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