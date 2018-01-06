function GetListHeader(){
	var nojurnal = document.getElementById('nojurnal').value;
	var tanggal = document.getElementById('tanggal').value;
	var noreferensi = document.getElementById('noreferensi').value;
	var statusposting = document.getElementById('statusposting');
	statusposting = statusposting.options[statusposting.selectedIndex].value;
	var method = 'GetListHeader';
	
	var param = "nojurnal="+nojurnal;
        param += "&tanggal="+tanggal;
        param += "&noreferensi="+noreferensi;
        param += "&statusposting="+statusposting;
        param += "&method="+method;
	
	post_response_text('keu_slave_get_posting_jurnal.php', param, respon);

	function respon() {
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				} else {
					var divListHeader = document.getElementById('divListHeader');
                        divListHeader.innerHTML = con.responseText;
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}
 
function viewDetail(num){
	var nojurnal = document.getElementById('nojurnal_'+num).innerHTML;
	var dibuatoleh = document.getElementById('dibuatoleh_'+num).value;
	var dipostingoleh = document.getElementById('dipostingoleh_'+num).value;
	var method = 'GetListDetails';
	
	var param = "nojurnal="+nojurnal;
	    param += "&dibuatoleh="+dibuatoleh;
        param += "&dipostingoleh="+dipostingoleh;
        param += "&method="+method;
	
	post_response_text('keu_slave_get_posting_jurnal.php', param, respon);

	function respon() {
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				} else {
					var divs = document.querySelectorAll("[id]");
					for (var i = 0, len = divs.length; i < len; i++) {
						var div = divs[i];
						if (div.id.indexOf("tr_") > -1) {
							div.style.color = "black";
						}
					}
					document.getElementById("tr_"+num).style.color = "#ff0000";
					var divDetail = document.getElementById('divDetail');
                        divDetail.innerHTML = con.responseText;
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
} 


function PostingJurnal(num){
	var nojurnal = document.getElementById('nojurnal_'+num).innerHTML;
	
	var method = 'PostingJurnal';
	
	var param = "nojurnal="+nojurnal;
        param += "&method="+method;
	
	post_response_text('keu_slave_save_posting_jurnal.php', param, respon);

	function respon() {
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				} else {
					if(con.responseText == 'Posting Gagal, Debet dan Kredit tidak sama') {
						alert(con.responseText);
					} else {
						alert('Jurnal berhasil di posting');
						var row = document.getElementById('tr_'+num);
							row.parentNode.removeChild(row);
					}
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}

function detailPDF(numRow,ev) {
    formPrint('pdf','1','##nojurnal_'+numRow,'','keu_slave_jurnal_print',ev,true);
}