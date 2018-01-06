function toRp(angka){
    var rev     = parseInt(angka, 10).toString().split('').reverse().join('');
    var rev2    = '';
    for(var i = 0; i < rev.length; i++){
        rev2  += rev[i];
        if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
            rev2 += '.';
        }
    }
    return rev2.split('').reverse().join('') + ',00';
}

function CariData(){
	var Method		 = 'CariData'; 
	var Bank		 = document.getElementById('bank').options[document.getElementById('bank').selectedIndex].value; 
	var TanggalMulai = document.getElementById('tanggalmulai').value; 
	var TanggalAkhir = document.getElementById('tanggalakhir').value; 

	if(TanggalMulai == ''){
		alert('Periode Awal harus di isi');
		return;
	}
	
	if(TanggalAkhir == ''){
		alert('Periode Akhir harus di isi');
		return;
	}
	
	var param	= 'method='+Method+'&bank='+Bank+'&tanggalmulai='+TanggalMulai+'&tanggalakhir='+TanggalAkhir;
	var tujuan 	= 'keu_slave_get_bank_reconcile.php';
	post_response_text(tujuan, param, respog);

	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					} else {
						var res = document.getElementById('printContainer');
						//document.getElementById('btnDownload').style.display = 'block';
						//document.getElementById("btnDownload").setAttribute("onclick", "DownloadExcel()");
						res.innerHTML = con.responseText;
						//SaldoAkhirBankSystemInput = document.getElementById('SaldoAkhirBankSystemInput').value; 
						var saldosystem = toRp(document.getElementById('SaldoAkhirBankSystemInput').value);
						document.getElementById('saldosystem').value= saldosystem; 
						document.getElementById('saldosystemhidden').value= document.getElementById('SaldoAkhirBankSystemInput').value; 
						document.getElementById('saldoakhirbankfieldset').style.display = 'block';
					}
			}
			else {
				alert('ERROR TRANSACTION,\n' + con.responseText);
				error_catch(con.status);
				busy_off();
			}
		}
	}
}

function DownloadExcel(){
	var Method 		 = 'DownloadExcel';
	var Bank		 = document.getElementById('bank').options[document.getElementById('bank').selectedIndex].value; 
	var TanggalMulai = document.getElementById('tanggalmulai').value; 
	var TanggalAkhir = document.getElementById('tanggalakhir').value; 
	
	var param	= 'method='+Method+'&bank='+Bank+'&tanggalmulai='+TanggalMulai+'&tanggalakhir='+TanggalAkhir;
	var tujuan 	= 'sdm_slave_print_rekapabsen.php';
	printFile(param,tujuan,judul,ev);
}

function PrintFile(param,tujuan,title,ev)
{
   tujuan=tujuan+"?"+param;  
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev); 	
}

function SimpanData(){
	// GET DATA HEADER
	var Method 		 = 'SimpanData';
	var Bank 		 = document.getElementById('bank').options[document.getElementById('bank').selectedIndex].value; 
	var TanggalMulai = document.getElementById('tanggalmulai').value; 
	var TanggalAkhir = document.getElementById('tanggalakhir').value; 
	var SaldoSystem  = document.getElementById('saldosystemhidden').value; 
	var SaldoBank  	 = document.getElementById('saldobank').value; 
	var Selisih  	 = document.getElementById('selisihhidden').value; 
	
	
	// GET DATA DETAILS
	var TotalRecord = trim(document.getElementById('TotalData').value);
	var GetDetails = new Array(TotalRecord);
	
	for(var c = 1; c <= TotalRecord; c++) {		
		GetDetails[c-1] = {
			'tanggal' : document.getElementById('tanggal'+c).value,
			'nojurnal' : document.getElementById('nojurnal'+c).value,
			'chequeno' : document.getElementById('chequeno'+c).value,
			'keterangan' : document.getElementById('keterangan'+c).value,
			'debet' : document.getElementById('debet'+c).value,
			'kredit' : document.getElementById('kredit'+c).value,
			'curbalance' : document.getElementById('curbalance'+c).value
		}
	}
	
	param='bank='+Bank+'&tanggalmulai='+TanggalMulai+'&tanggalakhir='+TanggalAkhir;
	param+='&saldosystem='+SaldoSystem+'&saldobank='+SaldoBank+'&selisih='+Selisih;	
	param+='&method='+Method+'&details='+JSON.stringify(GetDetails);	
	tujuan='keu_slave_save_bank_reconcile.php';
	
	if(confirm('Simpan Data ?')) {post_response_text(tujuan, param, respog);}		
	
	function respog() {
		if(con.readyState==4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
				else {
					alert('Suksess');
					//showById('printPanel2');
					//document.getElementById("buttonsave").disabled = true;
					//pendi();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}	
}