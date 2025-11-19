const API_BASE = window.location.origin + '/api';

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
	// If a file is provided as `harga`? (legacy) — caller should pass `gambar` when needed.
	// Support sending multipart/form-data when a File is present under `gambar` property.
	if (arguments[0] && arguments[0].gambar instanceof File) {
		const { nama, harga, gambar } = arguments[0];
		const formData = new FormData();
		formData.append('nama', nama);
		formData.append('harga', harga);
		formData.append('gambar', gambar);

		const res = await fetch(`${API_BASE}/produk`, {
			method: 'POST',
			body: formData
		});
		return handleResponse(res);
	}

	const { nama: n, harga: h } = arguments[0] || {};
	const res = await fetch(`${API_BASE}/produk`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ nama: n, harga: h })
	});
	return handleResponse(res);
}

export async function updateProduk(id, { nama, harga, gambar }) {
	// If caller provided a File under `gambar`, send multipart/form-data
	if (arguments[1] && arguments[1].gambar instanceof File) {
		const formData = new FormData();
		if (nama !== undefined) formData.append('nama', nama);
		if (harga !== undefined) formData.append('harga', harga);
		formData.append('gambar', gambar);

		const res = await fetch(`${API_BASE}/produk/${id}`, {
			method: 'PUT',
			body: formData
		});
		return handleResponse(res);
	}

	const res = await fetch(`${API_BASE}/produk/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ nama, harga })
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
