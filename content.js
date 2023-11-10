function criarEventosAnuais() {
    // Obtenha o ID do calendário
    var calendarioId = '4f588caf3a67e56310a2a87ae76f2ace97d006267596137331c2f8ca4739b6eb@group.calendar.google.com';
  
    // Obtenha a página da planilha "All"
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('All');
    var dados = planilha.getDataRange().getValues();
  
    // Laço de repetição sobre as linhas da planilha
    for (var i = 1; i < dados.length; i++) {
      var titulo = dados[i][2] + '  - Aniversário'; // Coluna C - assumindo que a primeira linha é um cabeçalho
  
      var descricao = 
      "<b>Entre em contato:</b>" + 
      "\nWhatsapp: " + dados[i][5] + 
      "\nInstagram: " + dados[i][6] + 
      "\nFacebook: " + dados[i][9];
  
      var dataNascimento = dados[i][10]; // Coluna K
  
      // Verifica se a célula tem uma data
      if (dataNascimento instanceof Date) {
        // Configura a regra de repetição anual
        var regraRepeticao = CalendarApp.newRecurrence().addYearlyRule();
  
        // Crie o evento no Google Agenda com repetição anual e duração de um dia
        var evento = CalendarApp.getCalendarById(calendarioId).createAllDayEventSeries(titulo, dataNascimento, regraRepeticao, {description: descricao});
  
        // Configuração da notificação pop-up 5 minutos antes do evento
        var minutosAntes = 5; // Aparentemente esse é o mínimo, é melhor pesquisar antes de modificar
        evento.addPopupReminder(minutosAntes);
  
        Logger.log('Evento criado: ' + evento.getTitle());
      }
    }
  }
  