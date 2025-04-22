function consultarCNPJ() {
    const cnpj = document.getElementById("cnpjInput").value.replace(/\D/g, '');
    const url = `https://open.cnpja.com/office/${cnpj}`;
  
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar CNPJ");
        return res.json();
      })
      .then(data => {
        const resultado = document.getElementById("resultado");
        resultado.innerHTML = `
          <h2>${data.company.name}</h2>
          <p><strong>CNPJ:</strong> ${data.taxId}</p>
          <p><strong>Status:</strong> ${data.status.text}</p>
          <p><strong>Natureza Jurídica:</strong> ${data.company.nature.text}</p>
          <p><strong>Porte:</strong> ${data.company.size.text}</p>
          <p><strong>Fundação:</strong> ${data.founded}</p>
          <p><strong>Endereço:</strong> ${data.address.street}, ${data.address.number} - ${data.address.district}, ${data.address.city} - ${data.address.state}</p>
        `;
        resultado.classList.remove("hidden");
      })
      .catch(error => {
        alert("CNPJ inválido ou não encontrado.");
        console.error(error);
      });
  }
  