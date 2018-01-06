function resetHeader(){
	document.getElementById('notransaksi').value='';
	document.getElementById('kodeorganisasi').value=document.getElementById('defaultcompany').value;
	document.getElementById('pilihperiode').value='';
	document.getElementById('pilihkegiatan').value='';
	document.getElementById('tanggalmulai').value='';
	document.getElementById('tanggalsampai').value='';
	document.getElementById('biaya').value='0';
	document.getElementById('hasil').value='0';
	document.getElementById('keterangan').value='';
	document.getElementById('pilihsatuan').value='';
	document.getElementById('method').value='INSERTHEADER';
}

function lanjutHeader(){
	
		tabAction(document.getElementById('tabFRM1'),1,'FRM',2);
}

function lanjutTenagakerja(){
	
		tabAction(document.getElementById('tabFRM2'),2,'FRM',2);
}



function simpanTenagakerja()
{
	var notransaksi=document.getElementById('notransaksi').value;
	var seqno=document.getElementById('seqno2').value;
	var pilihtugaskma=document.getElementById('pilihtugaskma2').value;
	var pilihjenistenagakerja=document.getElementById('pilihjenistenagakerja').value;
	
	var pilihkma1=document.getElementById('pilihkma4').value;
	var res = pilihkma1.split(" --> "); 
	var pilihkma=res[0];
		
	var employeename=remove_comma(document.getElementById('employeename'));
	var tanggalmulai2=document.getElementById('tanggalmulai3').value;
	var tanggalsampai2=document.getElementById('tanggalsampai3').value;
	var pilihjam1=document.getElementById('pilihjam3').value;
	var pilihmenit1=document.getElementById('pilihmenit3').value;
	var pilihdetik1=document.getElementById('pilihdetik3').value;
	var pilihjam2=document.getElementById('pilihjam4').value;
	var pilihmenit2=document.getElementById('pilihmenit4').value;
	var pilihdetik2=document.getElementById('pilihdetik4').value;
	
	var method=document.getElementById('method2').value;
	
	
	if(notransaksi=='') {
		alert(document.getElementById('notransaksi').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	if(pilihtugaskma=='') {
		alert(document.getElementById('pilihtugaskma').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	
	if(pilihjenistenagakerja=='') {
		alert(document.getElementById('pilihjenistenagakerja').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	
	if(pilihkma1=='') {
		alert(document.getElementById('pilihkma1').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
		
	
	if(pilihkma=='') {
		alert(document.getElementById('pilihkma4').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
		
	
	
	if(employeename=='') {
		alert(document.getElementById('employeename').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}		
		
	
	
	if(tanggalmulai2=='') {
		alert(document.getElementById('tanggalmulai2').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}		
	
	
	if(tanggalsampai2=='') {
		alert(document.getElementById('tanggalsampai2').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	

	
	if(confirm(document.getElementById('alertqinsert').value)){
	   param='method='+method+
			 '&notransaksi='+notransaksi+
			 '&pilihtugaskma='+pilihtugaskma+
			 '&seqno='+seqno+
			 '&pilihkma='+pilihkma+
			 '&employeename='+employeename+
			 '&tanggalmulai2='+tanggalmulai2+
			 '&tanggalsampai2='+tanggalsampai2+
			 '&pilihjam1='+pilihjam1+
			 '&pilihmenit1='+pilihmenit1+
			 '&pilihdetik1='+pilihdetik1+
			 '&pilihjam2='+pilihjam2+
			 '&pilihmenit2='+pilihmenit2+
			 '&pilihdetik2='+pilihdetik2+
			 '&pilihjenistenagakerja='+pilihjenistenagakerja;
	   tujuan='traksi_slave_operationalBNY.php';
	   post_response_text(tujuan, param, respog);
	}
	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									
									var a=con.responseText.split('|');
									alert(a[0]);
									document.getElementById('notransaksi').value=notransaksi;
									document.getElementById('seqno2').value=a[2];
									getKMA2()
									kosongTenagakerja();
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	}   
	
}



function delheader(notransaksi,kodeorganisasi,pilihperiode){
	document.getElementById('pilihtugaskma').value='';
	document.getElementById('pilihtugaskma2').value='';
	kmaonchange();
	getKMA2();
	kosongTenagakerja();
	kosongkegiatan();
	
	param='notransaksi='+notransaksi+'&kodeorganisasi='+kodeorganisasi+'&pilihperiode='+pilihperiode+'&method=DELETEHEADER';
	tujuan='traksi_slave_operationalBNY.php';
	if(confirm(document.getElementById('alertqdelete').value)){
		post_response_text(tujuan, param, respog);	
	}
				
	function respog(){
	if(con.readyState==4){
	if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						alert(con.responseText);
						loadData();
						
					}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
	}	
	} 	
}


function getKMAexist(){
	var tugaskma=document.getElementById('pilihtugaskma2').value;
	var notransaksi=document.getElementById('notransaksi').value;
	param='notransaksi='+notransaksi+'&method=AMBILKMA&tugaskma='+tugaskma;
	tujuan='traksi_slave_operationalBNY.php';
	post_response_text(tujuan, param, respog);	
				
	function respog(){
	if(con.readyState==4){
		if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
						}
						else {
							document.getElementById('pilihkma4').innerHTML=con.responseText;							
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		}	
	} 	
}

function delKegiatan(notransaksi,seqno){
	param='notransaksi='+notransaksi+'&seqno='+seqno+'&method=DELETEKEGIATAN';
	tujuan='traksi_slave_operationalBNY.php';
	if(confirm(document.getElementById('alertqdelete').value)){
		post_response_text(tujuan, param, respog);	
	}
				
	function respog(){
	if(con.readyState==4){
	if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						alert(con.responseText);
						kmaonchange();
						kosongkegiatan();	
					}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
	}	
	} 	
}

function kosongTenagakerja(){
	document.getElementById('pilihkma4').value='';
	document.getElementById('employeename').value='';
	document.getElementById('pilihjenistenagakerja').value='';
	document.getElementById('tanggalmulai3').value='';
	document.getElementById('tanggalsampai3').value='';
	document.getElementById('pilihjam3').value='00';
	document.getElementById('pilihmenit3').value='00';
	document.getElementById('pilihdetik3').value='00';
	document.getElementById('pilihjam4').value='00';
	document.getElementById('pilihmenit4').value='00';
	document.getElementById('pilihdetik4').value='00';
	document.getElementById('method2').value='INSERTTENAKER';
}

function delTenagakerja(notransaksi,seqno){
	param='notransaksi='+notransaksi+'&seqno='+seqno+'&method=DELETETENAKER';
	tujuan='traksi_slave_operationalBNY.php';
	if(confirm(document.getElementById('alertqdelete').value)){
		post_response_text(tujuan, param, respog);	
	}
				
	function respog(){
	if(con.readyState==4){
	if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						alert(con.responseText);
						getKMA2()
						kosongTenagakerja();	
					}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
	}	
	} 	
}

function kosongkegiatan(){
	document.getElementById('bahanbakar').value=0;
	document.getElementById('tanggalmulai2').value='';
	document.getElementById('tanggalsampai2').value='';
	document.getElementById('pilihjam1').value='00';
	document.getElementById('pilihmenit1').value='00';
	document.getElementById('pilihdetik1').value='00';
	document.getElementById('pilihjam2').value='00';
	document.getElementById('pilihmenit2').value='00';
	document.getElementById('pilihdetik2').value='00';
	document.getElementById('hasil2').value=0;
	document.getElementById('pilihsatuan2').value='';
	document.getElementById('method1').value='INSERTKEGIATAN';
}

function simpanKegiatan()
{
	var notransaksi=document.getElementById('notransaksi').value;
	var seqno=document.getElementById('seqno').value;
	var pilihtugaskma=document.getElementById('pilihtugaskma').value;
	var pilihkma1=document.getElementById('pilihkma').value;
	var res = pilihkma1.split(" --> "); 
	var pilihkma=res[0];
		
	var bahanbakar=remove_comma(document.getElementById('bahanbakar'));
	var tanggalmulai2=document.getElementById('tanggalmulai2').value;
	var tanggalsampai2=document.getElementById('tanggalsampai2').value;
	var pilihjam1=document.getElementById('pilihjam1').value;
	var pilihmenit1=document.getElementById('pilihmenit1').value;
	var pilihdetik1=document.getElementById('pilihdetik1').value;
	var pilihjam2=document.getElementById('pilihjam2').value;
	var pilihmenit2=document.getElementById('pilihmenit2').value;
	var pilihdetik2=document.getElementById('pilihdetik2').value;
	var hasil=remove_comma(document.getElementById('hasil2'));
	var satuan=document.getElementById('pilihsatuan').value;
	var method=document.getElementById('method1').value;
	
	
	if(notransaksi=='') {
		alert(document.getElementById('notransaksi').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	/*
	if(pilihtugaskma=='') {
		alert(document.getElementById('pilihtugaskma').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	
	if(pilihkma=='') {
		alert(document.getElementById('pilihkma').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	
	if(bahanbakar=='') {
		alert(document.getElementById('bahanbakar').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(tanggalmulai2=='') {
		alert(document.getElementById('tanggalmulai2').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(tanggalsampai2=='') {
		alert(document.getElementById('tanggalsampai2').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(biaya=='') {
		alert(document.getElementById('biaya').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(hasil=='') {
		alert(document.getElementById('hasil').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(satuan=='') {
		alert(document.getElementById('satuan').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
*/
	
	if(confirm(document.getElementById('alertqinsert').value)){
	   param='method='+method+
			 '&notransaksi='+notransaksi+
			 '&pilihtugaskma='+pilihtugaskma+
			 '&seqno='+seqno+
			 '&pilihkma='+pilihkma+
			 '&bahanbakar='+bahanbakar+
			 '&tanggalmulai2='+tanggalmulai2+
			 '&tanggalsampai2='+tanggalsampai2+
			 '&pilihjam1='+pilihjam1+
			 '&pilihmenit1='+pilihmenit1+
			 '&pilihdetik1='+pilihdetik1+
			 '&pilihjam2='+pilihjam2+
			 '&pilihmenit2='+pilihmenit2+
			 '&pilihdetik2='+pilihdetik2+
			 '&hasil2='+hasil+
			 '&pilihsatuan2='+satuan;
	   tujuan='traksi_slave_operationalBNY.php';
	   post_response_text(tujuan, param, respog);
	}
	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									
									var a=con.responseText.split('|');
									alert(a[0]);
									document.getElementById('notransaksi').value=notransaksi;
									document.getElementById('seqno').value=a[2];
									kmaonchange();
									kosongkegiatan();
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	}   
	
}


function simpanHeader()
{
	var notransaksi=document.getElementById('notransaksi').value;
	var kodeorganisasi=document.getElementById('kodeorganisasi').value;
	var pilihperiode=document.getElementById('pilihperiode').value;
	var pilihkegiatan=document.getElementById('pilihkegiatan').value;
	var tanggalmulai=document.getElementById('tanggalmulai').value;
	var tanggalsampai=document.getElementById('tanggalsampai').value;
	var biaya=remove_comma(document.getElementById('biaya'));
	var hasil=remove_comma(document.getElementById('hasil'));
	var keterangan=document.getElementById('keterangan').value;
	var satuan=document.getElementById('pilihsatuan').value;
	var method=document.getElementById('method').value;
	

	/*
	
	if(pilihperiode=='') {
		alert(document.getElementById('pilihperiode').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	
	if(kodeorganisasi=='') {
		alert(document.getElementById('kodeorganisasi').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}
	
	if(pilihkegiatan=='') {
		alert(document.getElementById('pilihkegiatan').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(tanggalmulai=='') {
		alert(document.getElementById('tanggalmulai').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(tanggalsampai=='') {
		alert(document.getElementById('tanggalsampai').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(biaya=='') {
		alert(document.getElementById('biaya').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}	
	
	if(hasil=='') {
		alert(document.getElementById('hasil').innerHTML + ' ' + document.getElementById('alertrequired').value);
		return;
	}

*/

	if(confirm(document.getElementById('alertqinsert').value)){
	   param='method='+method+
			 '&notransaksi='+notransaksi+
			 '&kodeorganisasi='+kodeorganisasi+
			 '&pilihperiode='+pilihperiode+
			 '&pilihkegiatan='+pilihkegiatan+
			 '&tanggalmulai='+tanggalmulai+
			 '&tanggalsampai='+tanggalsampai+
			 '&biaya='+biaya+
			 '&hasil='+hasil+
			 '&satuan='+satuan+
			 '&keterangan='+keterangan;
	   tujuan='traksi_slave_operationalBNY.php';
	   post_response_text(tujuan, param, respog);
	}
	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									
									var a=con.responseText.split('|');
									alert(a[0]);
									document.getElementById('notransaksi').value=a[1];
									
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	}   
	
}


function kmaonchange(){
	var pilih=document.getElementById('pilihtugaskma').value;
	getKMA(pilih);
	loadKegiatan();
	if (pilih!='FL'){
		document.getElementById('colhasil').style.display = 'none';
		document.getElementById('entrylblhasil').style.display = 'none';
		document.getElementById('entryhasil').style.display = 'none';
	}else{
		document.getElementById('colhasil').style.display = '';
		document.getElementById('entrylblhasil').style.display = '';
		document.getElementById('entryhasil').style.display = '';
	}
}


function getKMA(str) {	
	var x = document.getElementById("pilihkma");
	while(x.length > 0) {
			x.remove(x.length-1);
	}
	if(str=='')
	{
		return;
	}
	var y = document.getElementById("pilihkma2");
	if(str=='FL')
	{
		 y = document.getElementById("pilihkma1");
	}

	for(i = 0; i < y.length; i++)
	{
		var option = document.createElement("option");
			y.selectedIndex = i;			
			option.text = y.options[i].text;			
			x.add(option,y.options[i].value);
	}
}



function getKMA2() {	
		
	/*
	var str=document.getElementById('pilihtugaskma2').value;
	
	var x = document.getElementById("pilihkma4");
	while(x.length > 0) {
			x.remove(x.length-1);
	}
	if(str=='')
	{
		return;
	}
	var y = document.getElementById("pilihkma2");
	if(str=='FL')
	{
		 y = document.getElementById("pilihkma1");
	}
	
	for(i = 0; i < y.length; i++)
	{
		var option = document.createElement("option");
			y.selectedIndex = i;
			option.text = y.options[i].text;
			x.add(option,y.options[i].value);
	}
	*/
	loadTenagakerja();
}

function loadTenagakerja(){
		var notransaksi=document.getElementById('notransaksi').value;
		var tugaskma=document.getElementById('pilihtugaskma2').value;
		var filter1=document.getElementById('filter3').value;
		var keyword1=document.getElementById('keyword3').value;
		
        param="method=SHOWTENAKER&filter="+notransaksi+"&keyword="+tugaskma+"&filter1="+filter1+"&keyword1="+keyword1+"";
        tujuan = 'traksi_slave_operationalBNY.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container2').innerHTML=con.responseText;
								document.getElementById('method2').value='INSERTTENAKER';								
								getKMAexist();
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }	
}

function loadData(){	
		document.getElementById('form').style.display = 'none'; 
		document.getElementById('listdata').style.display = ''; 
		param='method=SHOWHEADER&filter=&keyword=';
        tujuan = 'traksi_slave_operationalBNY.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container').innerHTML=con.responseText;
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }		
}


function tampilData(){	
		//document.getElementById('form').style.display = 'none'; 
		//document.getElementById('listdata').style.display = ''; 
		param='method=SHOWHEADER&filter=&keyword=';
		tujuan = 'traksi_slave_operationalBNY.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container').innerHTML=con.responseText;
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }		
}

function loadKegiatan(){
		var notransaksi=document.getElementById('notransaksi').value;
		var tugaskma=document.getElementById('pilihtugaskma').value;
		var filter1=document.getElementById('filter2').value;
		var keyword1=document.getElementById('keyword2').value;
		
        param="method=SHOWKEGIATAN&filter="+notransaksi+"&keyword="+tugaskma+"&filter1="+filter1+"&keyword1="+keyword1+"";
        tujuan = 'traksi_slave_operationalBNY.php';
        post_response_text(tujuan, param, respog);
        function respog(){
			  if(con.readyState==4){
						if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
							}
							else {
								document.getElementById('container1').innerHTML=con.responseText;
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
			  }	
         }	
}

function editKegiatan(notransaksi,seqno){
	 param="method=GETKEGIATAN&notransaksi="+notransaksi+"&seqno="+seqno+"";
     tujuan='traksi_slave_operationalBNY.php';
     post_response_text(tujuan, param, respog);	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									document.getElementById('method1').value='UPDATEKEGIATAN';
									var a=con.responseText.split('|');
									document.getElementById('bahanbakar').value=a[4];
									document.getElementById('seqno').value=a[1];
									//alert(a[4]);								
									getKMA(a[5]);
									optTipe1=document.getElementById('pilihkma');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[12])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									document.getElementById('tanggalmulai2').value=a[6];
									document.getElementById('tanggalsampai2').value=a[8];
									var jam1=a[7].split(":");
									var jam2=a[9].split(":");
									
									optTipe1=document.getElementById('pilihjam1');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam1[0])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihmenit1');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam1[1])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihdetik1');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam1[2])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									
									
									optTipe1=document.getElementById('pilihjam2');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam2[0])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihmenit2');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam2[1])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihdetik2');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam2[2])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									document.getElementById('hasil2').value=a[10];
									
									optTipe1=document.getElementById('pilihsatuan2');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[11])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	} 
}

/*=====================================================================================*/

function editTenagakerja(notransaksi,seqno){
	 param="method=GETTENAKER&notransaksi="+notransaksi+"&seqno="+seqno+"";
     tujuan='traksi_slave_operationalBNY.php';
     post_response_text(tujuan, param, respog);	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									var a=con.responseText.split('|');
									
									document.getElementById('employeename').value=a[4];
									document.getElementById('seqno2').value=a[1];
									
									optTipe1=document.getElementById('pilihjenistenagakerja');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[9])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihkma4');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==a[3])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									
									document.getElementById('tanggalmulai3').value=a[5];
									document.getElementById('tanggalsampai3').value=a[7];
									
									var jam1=a[6].split(":");
									var jam2=a[8].split(":");
									
									optTipe1=document.getElementById('pilihjam3');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam1[0])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihmenit3');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam1[1])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihdetik3');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam1[2])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									
									
									optTipe1=document.getElementById('pilihjam4');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam2[0])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihmenit4');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam2[1])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									optTipe1=document.getElementById('pilihdetik4');
									for(x=0;x<optTipe1.length;x++){
											if(optTipe1.options[x].value==jam2[2])
											   optTipe1.options[x].selected=true;
									}
									optTipe1.disabled = false;
									
									document.getElementById('method2').value='UPDATETENAKER';
									
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	} 
}
/*=====================================================================================*/



function editHeader(notransaksi,kodeorganisasi,namaorganisasi,pilihperiode,pilihkegiatan,
					tanggalmulai,tanggalsampai,biaya,hasil,keterangan,satuan){
						
		document.getElementById('pilihtugaskma').value='';
		document.getElementById('pilihtugaskma2').value='';
		kmaonchange();
		getKMA2();
		kosongTenagakerja();
		kosongkegiatan();
		document.getElementById('form').style.display = '';
		document.getElementById('listdata').style.display = 'none';		
        document.getElementById('method').value='UPDATEHEADER';	
		
        document.getElementById('notransaksi').value=notransaksi;
        document.getElementById('kodeorganisasi').value=kodeorganisasi;
        document.getElementById('namaorganisasi').value=namaorganisasi;
        document.getElementById('notransaksi').value=notransaksi;
        document.getElementById('notransaksi').value=notransaksi;
        document.getElementById('tanggalmulai').value=tanggalmulai;
        document.getElementById('tanggalsampai').value=tanggalsampai;
        document.getElementById('biaya').value=biaya;
        document.getElementById('hasil').value=hasil;
        document.getElementById('keterangan').value=keterangan;
		
        optTipe=document.getElementById('pilihperiode');
        for(x=0;x<optTipe.length;x++){
                if(optTipe.options[x].value==pilihperiode)
                   optTipe.options[x].selected=true;
        }
		optTipe.disabled = false;
		
		optTipe1=document.getElementById('pilihkegiatan');
        for(x=0;x<optTipe1.length;x++){
                if(optTipe1.options[x].value==pilihkegiatan)
                   optTipe1.options[x].selected=true;
        }
		optTipe1.disabled = false;
		
		optTipe2=document.getElementById('pilihsatuan');
        for(x=0;x<optTipe2.length;x++){
                if(optTipe2.options[x].value==satuan)
                   optTipe2.options[x].selected=true;
        }
		optTipe1.disabled = false;
       	
}


function search(){
	var filter=document.getElementById('filter').value;
	var keyword=document.getElementById('keyword').value;
	 param="method=SHOWHEADER&filter="+filter+"&keyword="+keyword+"";
     tujuan='traksi_slave_operationalBNY.php';
     post_response_text(tujuan, param, respog);
	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									document.getElementById('container').innerHTML=con.responseText;
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	} 
	document.getElementById('form').style.display = 'none'; 
	document.getElementById('listdata').style.display = ''; 
}

function cariBast(num){
		filter  = document.getElementById('filter').value;
		keyword = document.getElementById('keyword').value;
	
		param='method=SHOWHEADER';
		param+='&page='+num;
		param+='&filter='+filter+'&keyword='+keyword;
		
		tujuan = 'traksi_slave_operationalBNY.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
				if (con.readyState == 4) {
					if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									alert('ERROR\n' + con.responseText);
							}
							else {
									document.getElementById('container').innerHTML=con.responseText;
							}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
				}
		}	
}




function search1(){
	var filter=document.getElementById('filter2').value;
	var keyword=document.getElementById('keyword2').value;
	var filter1=document.getElementById('notransaksi').value;
	var keyword1=document.getElementById('pilihtugaskma').value;
	 param="method=SHOWKEGIATAN&filter1="+filter+"&keyword1="+keyword+"&filter="+filter1+"&keyword="+keyword1+"";
     tujuan='traksi_slave_operationalBNY.php';
     post_response_text(tujuan, param, respog);
	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									document.getElementById('container1').innerHTML=con.responseText;
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	}
}

function cariBast1(num){
	var filter=document.getElementById('filter2').value;
	var keyword=document.getElementById('keyword2').value;
	var filter1=document.getElementById('notransaksi').value;
	var keyword1=document.getElementById('pilihtugaskma').value;
	 param="method=SHOWKEGIATAN&filter1="+filter+"&keyword1="+keyword+"&filter="+filter1+"&keyword="+keyword1+"";
		param+='&page='+num;
		param+='&filter1='+filter+'&keyword1='+keyword;
		
		tujuan = 'traksi_slave_operationalBNY.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
				if (con.readyState == 4) {
					if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									alert('ERROR\n' + con.responseText);
							}
							else {
									document.getElementById('container1').innerHTML=con.responseText;
							}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
				}
		}	
}

function selesai(){
	 window.location.assign("traksi_operationalBNY.php");
}




function search2(){
	var filter=document.getElementById('filter3').value;
	var keyword=document.getElementById('keyword3').value;
	var filter1=document.getElementById('notransaksi').value;
	var keyword1=document.getElementById('pilihtugaskma2').value;
	 param="method=SHOWTENAKER&filter1="+filter+"&keyword1="+keyword+"&filter="+filter1+"&keyword="+keyword1+"";
     tujuan='traksi_slave_operationalBNY.php';
     post_response_text(tujuan, param, respog);
	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200) {
								busy_off();
								if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
								}
								else {
									document.getElementById('container2').innerHTML=con.responseText;
								}
						}
						else {
								busy_off();
								error_catch(con.status);
						}
		}	
	}
}

function cariBast2(num){
	var filter=document.getElementById('filter3').value;
	var keyword=document.getElementById('keyword3').value;
	var filter1=document.getElementById('notransaksi').value;
	var keyword1=document.getElementById('pilihtugaskma').value;
	 param="method=SHOWKEGIATAN&filter1="+filter+"&keyword1="+keyword+"&filter="+filter1+"&keyword="+keyword1+"";
		param+='&page='+num;
		param+='&filter1='+filter+'&keyword1='+keyword;
		
		tujuan = 'traksi_slave_operationalBNY.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
				if (con.readyState == 4) {
					if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									alert('ERROR\n' + con.responseText);
							}
							else {
									document.getElementById('container2').innerHTML=con.responseText;
							}
					}
					else {
							busy_off();
							error_catch(con.status);
					}
				}
		}	
}


function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	kmaonchange();
	resetHeader();
}
