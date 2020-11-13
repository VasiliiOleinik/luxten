$(function(){

	tableCellsWidth($('#replenishTable'));
	tableCellsWidth($('#replenishHistory'));
	tableCellsWidth($('#reportsTable'));
	tableCellsWidth($('#teamList'));
	tableCellsWidth($('#withdrawFundsTable'));
	tableCellsWidth($('#investMyTable'));
});

function tableCellsWidth(table) {
	var customTableLength = table.find('.table-header .table-row div').length;
	var tableWidth = table.width();
	var widthCustom = (tableWidth - 30) / customTableLength;
	if(customTableLength == 4 && screen.width < 768) {
		widthCustom = ((tableWidth - 30) / customTableLength) + 7;
	}
	table.find('.table-row .table-cell').css({'width': widthCustom});
}