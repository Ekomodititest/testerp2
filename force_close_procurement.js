// MODEL FUNCTION //
function CariData(){
	var find_type = document.getElementById('find_type').options[document.getElementById('find_type').selectedIndex].value;
	var katakunci = document.getElementById('katakunci').value;
	var method = 'CariListDataHeader';
	
	var param = "method="+method+"&find_type="+find_type+"&katakunci="+katakunci;
	var tujuan = 'slave_get_force_close_procurement.php';
	post_response_text(tujuan, param, respog);
	
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
                else {
					//Data = con.responseText.split("####");
					document.getElementById('ListData').innerHTML=con.responseText;
                }
            } else {
                    busy_off();
                    error_catch(con.status);
            }
		}
	}
}
function CariNoTransaksi(){
	busy_on();
	txtfind		 	= document.getElementById('text_transaksi').value;
	tipe_transaksi	= document.getElementById('tipe_transaksi').options[document.getElementById('tipe_transaksi').selectedIndex].value;
	method			= 'CariNoTransaksi';
	
	if(tipe_transaksi == 'ALL') {
		alert('Pilih Tipe Transaksi');
		return;
	}
	
	param	= 'txtfind='+txtfind+'&tipe_transaksi='+tipe_transaksi+'&method='+method;
	tujuan	= 'slave_get_force_close_procurement.php';
	post_response_text(tujuan, param, respog);
	
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR\n' + con.responseText);}
				else {document.getElementById('ContainerNoTransaksi').innerHTML=con.responseText;}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}
function DeatilsTransaksi(KodeBarang, NamaBarang,Nopo){	
	var no_tutup_paksa = document.getElementById('no_tutup_paksa').value;
	var tipe_transaksi = document.getElementById('tipe_transaksi').options[document.getElementById('tipe_transaksi').selectedIndex].value;
	var tipe_transaksi_name = document.getElementById('tipe_transaksi').options[document.getElementById('tipe_transaksi').selectedIndex].text;
	var no_transaksi   = document.getElementById('no_transaksi').value;
	var method = 'GetDetailSingleTransaksi';
	
	PopUpDetailTransaksi(NamaBarang,tipe_transaksi_name,no_transaksi);
	
	param ='no_tutup_paksa='+no_tutup_paksa+'&tipe_transaksi='+tipe_transaksi+'&no_transaksi='+no_transaksi+'&method='+method+'&KodeBarang='+KodeBarang+'&Nopo='+Nopo;
	tujuan='slave_get_force_close_procurement.php';
	post_response_text(tujuan, param, respog);

	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {document.getElementById('PopUpDetail').innerHTML=con.responseText;}
				else {
					document.getElementById('PopUpDetail').innerHTML=con.responseText;
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	 }
}
function EditData(notutuppaksa){
	DisplayFormBuatBaru();
	method	= 'EditData';
	param	= 'notutuppaksa='+notutuppaksa+'&method='+method;
	tujuan	= 'slave_get_force_close_procurement.php';
	post_response_text(tujuan, param, respog);

	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR\n' + con.responseText);}
				else {
					var Ar = con.responseText.split('||');
					
					//Header//
					document.getElementById('no_tutup_paksa').value = Ar[0];
					document.getElementById('tipe_transaksi').value = Ar[1];
					document.getElementById('no_transaksi').value = Ar[2];
					
					//Details//
					document.getElementById('DivBodyListData').innerHTML=Ar[3];
					
					//Button//
					document.getElementById('ButtonSimpan').setAttribute('onclick','UpdateForceClose();');
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}
function SetNoTransaksi(no_transaksi, tipe_transaksi){
	busy_on();
	document.getElementById('no_transaksi').value=no_transaksi;
	tipe_transaksi	= document.getElementById('tipe_transaksi').options[document.getElementById('tipe_transaksi').selectedIndex].value;
	method			= 'DetailNoTransaksi';
	
	param	= 'no_transaksi='+no_transaksi+'&tipe_transaksi='+tipe_transaksi+'&method='+method;
	tujuan	= 'slave_get_force_close_procurement.php';
	post_response_text(tujuan, param, respog);

	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert('ERROR\n' + con.responseText);}
				else {document.getElementById('DivBodyListData').innerHTML=con.responseText;}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
	closeDialog();
}
function LoadListDataHeader(){
	var param = "method=LoadListDataHeader";
	var tujuan = 'slave_get_force_close_procurement.php';
	post_response_text(tujuan, param, respog);
	
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {alert('ERROR TRANSACTION,\n' + con.responseText);}
                else {
					//Data = con.responseText.split("####");
					document.getElementById('ListData').innerHTML=con.responseText;
                }
            } else {
                    busy_off();
                    error_catch(con.status);
            }
		}
	}
}

// CONTROLLER FUNCTION //
function SimpanForceClose() {
	busy_on();
	var table = document.getElementById('DivBodyListData');
	var totalrow = table.rows.length;
	var GetDetails = new Array(totalrow);
	
    for (var i = 0; i < totalrow; i++) {
		var dipilih = 0;
		
		ar=document.getElementById('cbox_'+i);
		if(ar.checked==true) {
			dipilih = 1;
		}
		
		GetDetails[i] = {
			'nama_barang' 	: document.getElementById('namabarang_'+i).value,
			'kodebarang' 	: document.getElementById('kodebarang_'+i).value,
			'jmlh_disetujui': document.getElementById('jmlh_disetujui_'+i).value,
			'sudah_dibeli' 	: document.getElementById('sudah_dibeli_'+i).value,
			'sudah_diterima_gudang' : document.getElementById('sudah_diterima_gudang_'+i).value,
			'dipilih' 		: dipilih,
			'nopo' 			: document.getElementById('nopo_'+i).value,
			'nopp' 			: document.getElementById('nopp_'+i).value
		}
    }
	
	var no_tutup_paksa = document.getElementById('no_tutup_paksa').value;
	var tipe_transaksi = document.getElementById('tipe_transaksi').options[document.getElementById('tipe_transaksi').selectedIndex].value;
	var no_transaksi = document.getElementById('no_transaksi').value;
	var method = 'INSERTNEW';
	
	param='no_tutup_paksa='+no_tutup_paksa+'&tipe_transaksi='+tipe_transaksi+'&no_transaksi='+no_transaksi;
	param+='&method='+method+'&details='+JSON.stringify(GetDetails);
	tujuan='slave_save_force_close_procurement.php';
	post_response_text(tujuan, param, respog);

	function respog() {
		if(con.readyState==4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert(con.responseText);}
				else {
					alert('Suksess');
					location.reload();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}	
}
function DeleteData(notutuppaksa){
	var param = "notutuppaksa="+notutuppaksa+'&method=DeleteData';
	var tujuan = 'slave_save_force_close_procurement.php';
	post_response_text(tujuan, param, respog);
	
	function respog() {
		if(con.readyState==4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert(con.responseText);}
				else {
					alert('Suksess');
					location.reload();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}	
}
function UpdateForceClose(){
	busy_on();
	var table = document.getElementById('DivBodyListData');
	var totalrow = table.rows.length;
	var GetDetails = new Array(totalrow);
	
    for (var i = 0; i < totalrow; i++) {
		var dipilih = 0;
		
		ar=document.getElementById('cbox_'+i);
		if(ar.checked==true) {
			dipilih = 1;
		}
		
		GetDetails[i] = {
			'nama_barang' 	: document.getElementById('namabarang_'+i).value,
			'kodebarang' 	: document.getElementById('kodebarang_'+i).value,
			'jmlh_disetujui': document.getElementById('jmlh_disetujui_'+i).value,
			'sudah_dibeli' 	: document.getElementById('sudah_dibeli_'+i).value,
			'sudah_diterima_gudang' : document.getElementById('sudah_diterima_gudang_'+i).value,
			'dipilih' 		: dipilih,
			'nopo' 			: document.getElementById('nopo_'+i).value,
			'nopp' 			: document.getElementById('nopp_'+i).value
		}
    }
	
	var no_tutup_paksa = document.getElementById('no_tutup_paksa').value;
	var tipe_transaksi = document.getElementById('tipe_transaksi').options[document.getElementById('tipe_transaksi').selectedIndex].value;
	var no_transaksi = document.getElementById('no_transaksi').value;
	var method = 'UPDATEDATA';
	
	param='no_tutup_paksa='+no_tutup_paksa+'&tipe_transaksi='+tipe_transaksi+'&no_transaksi='+no_transaksi;
	param+='&method='+method+'&details='+JSON.stringify(GetDetails);
	tujuan='slave_save_force_close_procurement.php';
	post_response_text(tujuan, param, respog);

	function respog() {
		if(con.readyState==4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {alert(con.responseText);}
				else {
					alert('Suksess');
					location.reload();
				}
			} else {
				busy_off();
				error_catch(con.status);
			}
		}	
	}	
}

// VIEW FUNCTION //
function DisplayFormBuatBaru(){
	var notutuppaksa = document.getElementById('no_tutup_paksa_hide').value;
	
	document.getElementById('TabFormBuatBaru').style.display='block';
	document.getElementById('TabListDataHeader').style.display='none';
	document.getElementById('no_transaksi').value='';
	document.getElementById('no_tutup_paksa').value=notutuppaksa;
	
}
function ListData(){
	document.getElementById('TabFormBuatBaru').style.display='none';
	document.getElementById('TabListDataHeader').style.display='block';
	document.getElementById('no_tutup_paksa').value='';
}
function FormCariNoTransaksi(ev){
	title 	= 'Cari No Transaksi';
	content = '<fieldset>No Transaksi<input type=text class=myinputtext id=text_transaksi>&nbsp;<button class=mybutton onclick=CariNoTransaksi()>Cari</fieldset>';
	content+= '<div id=ContainerNoTransaksi></div>';
	width ='500';
	height='400';
	showDialog1(title,content,width,height,ev);
}
function PopUpDetailTransaksi(NamaBarang,tipe_transaksi_name,no_transaksi){
	ev 		= "event";
	title	= "Details";
	content	= "<fieldset><legend>"+tipe_transaksi_name+" | "+no_transaksi+" | "+NamaBarang+"</legend><div id=PopUpDetail style='overflow:auto; width:750px; height:350px;' ></div></fieldset>/>";
	width	= '800';
	height	= '400';
	showDialog1(title,content,width,height,ev);	
}
function imgitem(kdbrg,event){
	window.open("log_slave_save_log_pp_img.php?kodebarang="+kdbrg+'&method=image','winname',"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=no,width=500,height=400");
}
function imglink(nopp,kdbrg,event){
	window.open("log_slave_save_log_pp_img.php?kodebarang="+kdbrg+'&method=linkpr&nopp='+nopp,'winname',"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=no,width=500,height=400");
}
function imglink2(nopp,kdbrg,event){
	window.open("log_slave_save_log_pp_img.php?kodebarang="+kdbrg+'&method=linkpr2&nopp='+nopp,'winname',"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=no,width=500,height=400");
}
