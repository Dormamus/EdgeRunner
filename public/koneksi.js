const API_BASE = 'http://localhost:3000/api';

async function handleResponse(res) {
	const contentType = res.headers.get('content-type') || '';
	if (!res.ok) {
		let err = { status: res.status, statusText: res.statusText };
		try {
			if (contentType.includes('application/json')) err.body = await res.json();
			else err.body = await res.text();
		} catch (e) {
			
		}
		throw err;
	}
	if (contentType.includes('application/json')) return res.json();
	return res.text();
}

// Produk
export async function getProduk() {
	const res = await fetch(`${API_BASE}/produk`);
	return handleResponse(res);
}

export async function addProduk({ nama, harga , kategori}) {
	const res = await fetch(`${API_BASE}/produk`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ nama, harga , kategori})
	});
	return handleResponse(res);
}

export async function updateProduk(id, { nama, harga, kategori }) {
	const res = await fetch(`${API_BASE}/produk/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ nama, harga, kategori })
	});
	return handleResponse(res);
}

export async function deleteProduk(id) {
	const res = await fetch(`${API_BASE}/produk/${id}`, { method: 'DELETE' });
	return handleResponse(res);
}

// Penjualan
export async function getPenjualan() {
	const res = await fetch(`${API_BASE}/penjualan`);
	return handleResponse(res);
}

export async function addPenjualan({ produkId, jumlah }) {
	const res = await fetch(`${API_BASE}/penjualan`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ produkId, jumlah })
	});
	return handleResponse(res);
}

export async function deletePenjualan(id) {
	const res = await fetch(`${API_BASE}/penjualan/${id}`, { method: 'DELETE' });
	return handleResponse(res);
}

// Ekonomi
export async function getEkonomi() {
	const res = await fetch(`${API_BASE}/ekonomi`);
	return handleResponse(res);
}

export async function getEkonomiByBulanTahun(bulan, tahun) {
	const res = await fetch(`${API_BASE}/ekonomi/bulan-tahun?bulan=${bulan}&tahun=${tahun}`);
	return handleResponse(res);
}

// Export to global
if (typeof window !== 'undefined') {
	window.EdgeRunnerAPI = window.EdgeRunnerAPI || {};
	Object.assign(window.EdgeRunnerAPI, {
		getProduk,
		addProduk,
		updateProduk,
		deleteProduk,
		getPenjualan,
		addPenjualan,
		deletePenjualan,
		getEkonomi,
		getEkonomiByBulanTahun
	});
}

// Export module
const EdgeRunnerAPI = {
	getProduk,
	addProduk,
	updateProduk,
	deleteProduk,
	getPenjualan,
	addPenjualan,
	deletePenjualan,
	getEkonomi,
	getEkonomiByBulanTahun
};

export default EdgeRunnerAPI;
