import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetAllBukuByKodeProdi, requestOptionsGet } from "../controller/template.js";
import { getNameByCode } from "../style/codemapping.js";

CihuyDomReady(() => {
    const tablebody = CihuyId("tablebody");
    const buttonsebelumnya = CihuyId("prevPageBtn");
    const buttonselanjutnya = CihuyId("nextPageBtn");
    const halamansaatini = CihuyId("currentPage");
    const itemperpage = 15;
    let halamannow = 1;

    const prodiSelect = CihuyId("prodiSelect");

    // Tambahkan event listener untuk perubahan pada input pilihan prodi
    prodiSelect.addEventListener("change", function() {
        const selectedProdiId = this.value;
        const GetAllBukuByKodeProdi = UrlGetAllBukuByKodeProdi+ `?kode_prodi=${selectedProdiId}`;

        // Cek apakah prodi yang dipilih adalah D4 Teknik Informatika (kode_prodi = 14)
        if (selectedProdiId === "14") {
            document.getElementById("tableD4TI").hidden = false;
            document.getElementById("tableAllProdi").hidden = true;
        } else {
            document.getElementById("tableD4TI").hidden = true;
            document.getElementById("tableAllProdi").hidden = false;
        }

        // Fetch data dari API berdasarkan prodi yang dipilih
        fetchData(GetAllBukuByKodeProdi);
    });

    // Fungsi untuk mengambil dan menampilkan data dari API
    function fetchData(GetAllBukuByKodeProdi) {
        fetch(GetAllBukuByKodeProdi, requestOptionsGet)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                let tableData = "";
                data.data.map((values) => {
                    if (values.kode_prodi === 14) {
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
                                    <p class="fw-normal mb-1">${getNameByCode(values.kode_prodi)}</p>
                                </td>
                                <td style="text-align: center; vertical-align: middle">
                                    <p class="fw-normal mb-1">${values.judul_buku}</p>
                                </td>
                                <td style="text-align: center; vertical-align: middle">
                                    <p class="fw-normal mb-1">${values.tahun_terbit}</p>
                                </td>
                                <td style="text-align: center; vertical-align: middle">
                                    <p class="fw-normal mb-1">${values.penerbit}</p>
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
                        } else {
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
                                        <p class="fw-normal mb-1">${getNameByCode(values.kode_prodi)}</p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle">
                                        <p class="fw-normal mb-1">${values.judul_buku}</p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle">
                                        <p class="fw-normal mb-1">${values.tahun_terbit}</p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle">
                                        <p class="fw-normal mb-1">${values.penerbit}</p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle">
                                        <p class="fw-normal mb-1">${values.autor}</p>
                                    </td>
                                    <td style="text-align: center; vertical-align: middle">
                                        <p class="fw-normal mb-1">${values.jumlah_kutipan}</p>
                                    </td>
                                </tr>`;
                        }
                });
                document.getElementById("tablebody").innerHTML = tableData;

                displayData(halamannow);
                updatePagination();
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    // Fungsi untuk menampilkan data
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

    // Fungsi untuk memperbarui informasi halaman saat ini
    function updatePagination() {
        halamansaatini.textContent = `Halaman ${halamannow}`;
    }

    // Event listener untuk tombol sebelumnya
    buttonsebelumnya.addEventListener("click", () => {
        if (halamannow > 1) {
            halamannow--;
            displayData(halamannow);
            updatePagination();
        }
    });

    // Event listener untuk tombol selanjutnya
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

    // Memanggil fungsi fetchData dengan nilai awal pilihan prodi
    const initialProdiId = prodiSelect.value;
    const initialUrl = `${UrlGetAllBukuByKodeProdi}/kode_prodi=${initialProdiId}`;
    fetchData(initialUrl);
});
