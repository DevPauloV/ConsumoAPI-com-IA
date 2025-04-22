function consultarCNPJ() {
    const cnpj = document.getElementById('cnpjInput').value.trim();
    const resultadoDiv = document.getElementById('resultado');
  
    if (cnpj === '') {
      alert("Por favor, digite um CNPJ.");
      return;
    }
  
    fetch(`https://open.cnpja.com/office/${cnpj}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao consultar CNPJ");
        }
        return response.json();
      })
      .then(data => {
        const company = data.company;
        const address = data.address;
  
        resultadoDiv.innerHTML = `
          <h2>${company.name}</h2>
          <p><strong>CNPJ:</strong> ${data.taxId}</p>
          <p><strong>Status:</strong> ${data.status.text}</p>
          <p><strong>Natureza Jurídica:</strong> ${company.nature.text}</p>
          <p><strong>Porte:</strong> ${company.size.text} (${company.size.acronym})</p>
          <p><strong>Data de Abertura:</strong> ${data.founded}</p>
          <p><strong>Atividade Principal:</strong> ${data.mainActivity.text}</p>
          <p><strong>Endereço:</strong> ${address.street}, ${address.number} - ${address.district}, ${address.city} - ${address.state}</p>
          <p><strong>Email:</strong> ${data.emails?.[0]?.address || 'Não informado'}</p>
          <p><strong>Telefone:</strong> (${data.phones?.[0]?.area}) ${data.phones?.[0]?.number || 'Não informado'}</p>
        `;
        resultadoDiv.classList.remove('hidden');
      })
      .catch(error => {
        resultadoDiv.innerHTML = `<p style="color: red;">Erro ao buscar CNPJ. Verifique se está correto.</p>`;
        resultadoDiv.classList.remove('hidden');
        console.error(error);
      });
  }
  