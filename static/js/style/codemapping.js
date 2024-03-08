// Mapping NIDN ke Nama
const codeToNameMapping = {
    "14" : "D4 Teknik Informatika",
    "13" : "D3 Teknik Informatika",
};

export let getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';