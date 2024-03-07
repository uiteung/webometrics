import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetAllPublikasi, requestOptionsGet } from "./controller/template.js";

// Untuk Membuat Pagination
CihuyDomReady(() => {
	const tablebody = CihuyId("tablebody");
	const buttonsebelumnya = CihuyId("prevPageBtn");
	const buttonselanjutnya = CihuyId("nextPageBtn");
	const halamansaatini = CihuyId("currentPage");
	const itemperpage = 5;
	let halamannow = 1;

fetch(UrlGetAllPublikasi, requestOptionsGet)
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
                            <p class="fw-normal mb-1">${values.id}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.nama_dosen}</p>
                        </td>
						<td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">D4 Teknik Informatika</p>
                        </td>
						<td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">Sekolah Vokasi</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.judul_paper}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.tahun_terbit}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.nama_publikasi}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.jenis_publikasi}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.ranking}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.jenis_penelitian}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.autor}</p>
                        </td>
                        <td style="text-align: center; vertical-align: middle">
                            <p class="fw-normal mb-1">${values.jumlah_kutipan}</p>
                        </td>
                    </tr>`;
		});
		document.getElementById("tablebody").innerHTML = tableData;

		displayData(halamannow);
		updatePagination();

		
	})
	.catch(error => {
		console.log('error', error);
	});

function displayData(page) {
	const baris = CihuyQuerySelector("#tablebody tr");
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
		tablebody.querySelectorAll("#tablebody tr").length / itemperpage
	);
	if (halamannow < totalPages) {
		halamannow++;
		displayData(halamannow);
		updatePagination();
	}
  });
});