import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { requestOptionsGet } from "./controller/template.js";

// Fetch Data Rekap Citasi Pertahun
CihuyDomReady(() => {
	const tablebody = CihuyId("tablebody");
	const buttonsebelumnya = CihuyId("prevPageBtn");
	const buttonselanjutnya = CihuyId("nextPageBtn");
	const halamansaatini = CihuyId("currentPage");
	const itemperpage = 5;
	let halamannow = 1;

fetch("https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/rekapcitasi", requestOptionsGet)
	.then((result) => {
		return result.json();
	})
	.then((data) => {
		let tableData = "";
		data.data.map((values) => {
			tableData += `
                        <tr>
                        <td hidden></td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.tahun_terbit}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.jumlah_kutipan}</p>
                        </td>
                    </tr>`;
		});
		document.getElementById("tablebodyRekap").innerHTML = tableData;

		displayData(halamannow);
		updatePagination();

		
	})
	.catch(error => {
		console.log('error', error);
	});

function displayData(page) {
	const baris = CihuyQuerySelector("#tablebodyRekap tr");
	const mulaiindex = (page - 1) * itemperpage;
	const akhirindex = mulaiindex + itemperpage;

	for (let i = 0; i < baris.length; i++) {
		if (i >= mulaiindex && i < akhirindex) {
			baris[i].style.display = "table-row";
		} else {
			baris[i].style.display = "none";
		}
	}
}
function updatePagination() {
	halamansaatini.textContent = `Halaman ${halamannow}`;
}

buttonsebelumnya.addEventListener("click", () => {
	if (halamannow > 1) {
		halamannow--;
		displayData(halamannow);
		updatePagination();
	}
});

buttonselanjutnya.addEventListener("click", () => {
	const totalPages = Math.ceil(
		tablebody.querySelectorAll("#tablebodyRekap tr").length / itemperpage
	);
	if (halamannow < totalPages) {
		halamannow++;
		displayData(halamannow);
		updatePagination();
	}
  });
});


// Fetch data untuk rekap jumlah citasi publikasi per tahun
document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan data dari endpoint API
    fetch('https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/rekapcitasi', requestOptionsGet)
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
    fetch('https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/citasijenistahun', requestOptionsGet)
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