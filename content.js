function criarEventosAnuais() {
  // ID do calendário
  var calendarioId = '2eb27d8d7766f49f8db1d2cab6a0608736fbf6c83d8252e75d9e55c810558f7c@group.calendar.google.com';

  // Obtém a planilha e os dados
  var planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Export');
  var dados = planilha.getDataRange().getValues();
  
  if (dados.length < 2) {
    Logger.log("Planilha sem dados suficientes.");
    return;
  }

  // Lê o cabeçalho da primeira linha
  var cabecalhos = dados[0];

  // Função auxiliar: encontra o índice de uma coluna pelo nome do cabeçalho
  function indiceColuna(nomeCabecalho) {
    var idx = cabecalhos.indexOf(nomeCabecalho);
    if (idx === -1) throw new Error("Cabeçalho não encontrado: " + nomeCabecalho);
    return idx;
  }

  // Mapeia os cabeçalhos necessários
  var idxNome = indiceColuna('First Name');
  var idxWhatsapp = indiceColuna('Mobile Phone');
  var idxInstagram = indiceColuna('Instagram');
  var idxFacebook = indiceColuna('Facebook');
  var idxAniversario = indiceColuna('Birthday'); // ou "Aniversário", conforme o cabeçalho na planilha

  // Percorre as linhas de dados (começa da segunda linha)
  for (var i = 1; i < dados.length; i++) {
    var nome = dados[i][idxNome];
    var whatsapp = dados[i][idxWhatsapp];
    var instagram = dados[i][idxInstagram];
    var facebook = dados[i][idxFacebook];
    var dataNascimento = dados[i][idxAniversario];

    if (!nome || !dataNascimento) continue;

    var titulo = nome + ' - Aniversário';
    var descricao =
      "<b>Entre em contato:</b>" +
      "\nWhatsapp: " + whatsapp +
      "\nInstagram: " + instagram +
      "\nFacebook: " + facebook;

    // Verifica se a célula contém uma data válida
    if (dataNascimento instanceof Date) {
      var regraRepeticao = CalendarApp.newRecurrence().addYearlyRule();
      var evento = CalendarApp.getCalendarById(calendarioId).createAllDayEventSeries(
        titulo,
        dataNascimento,
        regraRepeticao,
        { description: descricao }
      );

      evento.addPopupReminder(5);
      Logger.log('Evento criado: ' + evento.getTitle());
    } else {
      Logger.log("Data inválida em " + nome + ": " + dataNascimento);
    }
  }
}
