// Mapping NIDN ke Nama
const codeToNameMapping = {
    "14" : "D4 Teknik Informatika",
    "13" : "D3 Teknik Informatika",
    "23": "D3 Manajemen Informatika",
    "33": "D3 Akuntansi",
    "34": "D4 Akuntansi Keuangan",
    "43": "D3 Manajemen Pemasaran",
    "44": "D4 Manajemen Perusahaan",
    "53": "D3 Administrasi Logistik",
    "54": "D4 Logistik Bisnis",
    "74": "D4 Logistik Niaga",
    "81": "S1 Manajemen Transportasi",
    "82": "S1 Manajemen Logistik",
    "83": "S1 Bisnis Digital",
    "84": "S1 Sains Data",
    "85": "S1 Manajemen Rekayasa",
    "101": "S2 Manajemen Logistik"
};

export let getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';