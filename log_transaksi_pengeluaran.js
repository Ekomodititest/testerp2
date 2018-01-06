function setSloc(x){
	gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
    tglstart=document.getElementById(gudang+'_start').value;
	tglend=document.getElementById(gudang+'_end').value;
	tglstart=tglstart.substr(6,2)+"-"+tglstart.substr(4,2)+"-"+tglstart.substr(0,4);
	tglend=tglend.substr(6,2)+"-"+tglend.substr(4,2)+"-"+tglend.substr(0,4);
	document.getElementById('displayperiod').innerHTML=tglstart+" - "+tglend;
	document.getElementById('change').disabled = false;
	if (gudang != '') {
		if (x == 'simpan') {
			document.getElementById('sloc').disabled = true;
			document.getElementById('btnsloc').disabled = true;
			document.getElementById('pemilikbarang').disabled = true;
			tujuan = 'log_slave_getBastNumber.php';
			param = 'gudang=' + gudang;
			post_response_text(tujuan, param, respog);
		}
		else {
			location.reload(true);
		}	
		
	}	
	
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('nodok').value = trim(con.responseText);
					getBastList(gudang);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}

function getPT(gudang){
	param  ='gudang='+gudang;
	tujuan ='log_slave_gudangGetPTOption.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById("pemilikbarang").disabled = false;
					document.getElementById('pemilikbarang').innerHTML=con.responseText;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function loadSubunit(induk,penerimax){
	penerima=penerimax;
	param='induk='+induk;
	tujuan = 'log_slave_getSubUnitOption.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
				    loadKaryawan(induk,penerima);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	   	
}

function loadKaryawan(induk,penerima){	
    unit=document.getElementById('untukunit').value;
    param='unit='+unit+'&penerima='+penerima;
    tujuan = 'log_slave_getKaryawanOption.php';
    post_response_text(tujuan, param, respog);
    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('penerima').innerHTML=con.responseText;
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }		
}


function disableHeader(){
	document.getElementById('tanggal').disabled=true;
	document.getElementById('untukunit').disabled=true;
//	document.getElementById('subunit').disabled=true;
	document.getElementById('penerima').disabled=true;
	document.getElementById('catatan').disabled=true;	
	document.getElementById('nospb').disabled=true;	
}

function enableHeader(){
	document.getElementById('tanggal').disabled=false;
	document.getElementById('untukunit').disabled=false;
	document.getElementById('penerima').disabled=false;
	document.getElementById('catatan').disabled=false;
//	document.getElementById('subunit').disabled=false;	
}

function showWindowBarang(title,ev){	  
    content= "<div style='width:100%;'>";
	content+="<fieldset>"+title+"<input type=text id=txtnamabarang class=myinputtext size=25 onkeypress=\"return enterEuy(event);\" maxlength=35><button class=mybutton onclick=goCariBarang()>Go</button> </fieldset>";
	content+="<div id=containercari style='overflow:scroll;height:300px;width:520px'></div></div>";
	//display window
	width='550';
	height='350';
	showDialog1(title,content,width,height,ev);		
}

function enterEuy(evt){
	key=getKey(evt);
	if(key==13){
		goCariBarang();
	}
	else{
		return tanpa_kutip(evt);
	}
	
}

function loadField(kode,nama,satuan){
	document.getElementById('kodebarang').value=kode;
	document.getElementById('namabarang').value=nama;
	document.getElementById('satuan').value=satuan;
	closeDialog();		
}

function kosongkan(){
	document.getElementById('kodebarang').value='';
	document.getElementById('namabarang').value='';
	document.getElementById('penerima').value='';
	document.getElementById('catatan').value='';
	document.getElementById('satuan').value='';
	document.getElementById('qty').value=0;
	document.getElementById('blok').innerHTML="<option value=''></option>";
	document.getElementById('mesin').options[0].selected=true;
	document.getElementById('kegiatan').options[0].selected=true;
	document.getElementById('subunit').innerHTML="<option value=''></option>";
	enableHeader();	
}

function nextItem(){
	document.getElementById('kodebarang').disabled=false;
	document.getElementById('kodebarang').value='';	
	document.getElementById('namabarang').disabled=false;
	document.getElementById('namabarang').value='';	
	document.getElementById('satuan').disabled=false;
	document.getElementById('satuan').value='';		
	document.getElementById('oms').disabled=false;
	document.getElementById('qty').value=0;
	document.getElementById('method').value='insert';
	document.getElementById("kma").selectedIndex = "0";
	document.getElementById("traksi").selectedIndex = "0";
	document.getElementById("coa").selectedIndex = "0";
}

function bastBaru(){
  location.reload();
  /*nextItem();
  kosongkan();	
  setSloc('simpan');
  document.getElementById('untukunit').options[0].selected=true;
  document.getElementById('bastcontainer').innerHTML='';*/
}

function goCariBarang(){
	gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
	nodok=document.getElementById('nodok').value;
	if (nodok == '') {
		alert('Document Number is Obligatory');
	}
	else {
		txtcari = trim(document.getElementById('txtnamabarang').value);
		pemilikbarang = document.getElementById('pemilikbarang');
		pemilikbarang = pemilikbarang.options[pemilikbarang.selectedIndex].value;
		if (document.getElementById('nodok') == '') {
			alert('Document number is obligatory');
		}
		else 
			if (pemilikbarang.length < 3) {
				alert('Googs Owner(PT) is obligatory');
			}
			else {
				if (txtcari.length < 3) {
					alert('material name min. 3 char');
				}
				else {
					param = 'txtcari=' + txtcari + '&pemilikbarang=' + pemilikbarang;
					param+='&gudang='+gudang;
					tujuan = 'log_slave_cariBarang.php';
					post_response_text(tujuan, param, respog);
				}
			}
	}
	function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('containercari').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}		
}

function saveItemBast(){	
	// HEADER
	gudang 		= document.getElementById('sloc').value;
	pemilik		= trim(document.getElementById('pemilikbarang').value);		
	nodok		= trim(document.getElementById('nodok').value);		
	tanggal		= trim(document.getElementById('tanggal').value);
	untukunit	= trim(document.getElementById('untukunit').value);
	penerima	= trim(document.getElementById('penerima').value);
	jenis		= trim(document.getElementById('jenis').value);
	tipeop	    = trim(document.getElementById('tipeop').value);				
	oms			= trim(document.getElementById('oms').value);		
	nospb		= trim(document.getElementById('nospb').value);
	catatan		= trim(document.getElementById('catatan').value);		
	
	// DETAIL
	kodebarang	= trim(document.getElementById('kodebarang').value);
	namabarang	= trim(document.getElementById('namabarang').value);
	satuan		= trim(document.getElementById('satuan').value);
	qty			= trim(document.getElementById('qty').value);
	kma			= trim(document.getElementById('kma').value);
	traksi		= trim(document.getElementById('traksi').value);		
	coa			= trim(document.getElementById('coa').value);
	method		= trim(document.getElementById('method').value);
	
	if(jenis=='') {
		alert(document.getElementById('lbl_jenis').innerHTML + ' ' + document.getElementById('alertrequired').value);		
	}
	else if(jenis=='U') {
		if(gudang=='') { 
			alert(document.getElementById('lbl_gudang').innerHTML + ' ' + document.getElementById('alertrequired').value);
		} 
		else if(pemilik==''){
			alert(document.getElementById('lbl_pemilik').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}
		else if(nodok==''){
			alert(document.getElementById('lbl_momordok').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(tanggal==''){
			alert(document.getElementById('lbl_tanggal').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(untukunit==''){
			alert(document.getElementById('lbl_lokasi').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(penerima==''){
			alert(document.getElementById('lbl_diterima').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}		
		else if(nospb==''){
			alert(document.getElementById('lbl_spb').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}
		else if(catatan==''){
			alert(document.getElementById('lbl_note').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(kodebarang=='' || namabarang=='' || satuan=='' || parseFloat(qty)<0.001){
			alert('kode barang, namabarang, satuan dan jumlah' + ' ' + document.getElementById('alertrequired').value);
		} 
		else if(coa=='') {
			alert(document.getElementById('lbl_coa').innerHTML + ' ' + document.getElementById('alertrequired').value);		
		}	 
		else {
			if(confirm('Yakin akan menyimpan data ini?')){
				param='nodok='+nodok+'&tanggal='+tanggal+'&untukunit='+untukunit;
				param+='&oms='+oms+'&penerima='+penerima+'&nospb='+nospb;
				param+='&catatan='+catatan+'&kodebarang='+kodebarang+'&satuan='+satuan;
				param+='&qty='+qty+'&kma='+kma+'&pemilikbarang='+pemilikbarang;
				param+='&traksi='+traksi+'&coa='+coa+'&jenis='+jenis+'&tipeop='+tipeop;
				param+='&method='+method+'&gudang='+gudang;
				tujuan='log_slave_saveBast.php';
				post_response_text(tujuan, param, respog);
				disableHeader();
				document.getElementById('qty').style.backgroundColor='red';
			}			
		}	
	} 
	else if(jenis=='T'){
		if(gudang=='') { 
			alert(document.getElementById('lbl_gudang').innerHTML + ' ' + document.getElementById('alertrequired').value);
		} 
		else if(pemilik==''){
			alert(document.getElementById('lbl_pemilik').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}
		else if(nodok==''){
			alert(document.getElementById('lbl_momordok').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(tanggal==''){
			alert(document.getElementById('lbl_tanggal').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(untukunit==''){
			alert(document.getElementById('lbl_lokasi').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(penerima==''){
			alert(document.getElementById('lbl_diterima').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}	
		else if(tipeop==''){
			alert(document.getElementById('lbl_tipeop').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}		
		else if(oms==''){
			alert(document.getElementById('lbl_oms').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}		
		else if(nospb==''){
			alert(document.getElementById('lbl_spb').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}		
		else if(catatan==''){
			alert(document.getElementById('lbl_note').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}		
		else if(kodebarang=='' || namabarang=='' || satuan=='' || parseFloat(qty)<0.001){
			alert('kode barang, namabarang, satuan dan jumlah' + ' ' + document.getElementById('alertrequired').value);
		}		
		else if(kma==''){
			alert(document.getElementById('lbl_kma').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}		
		else if(traksi==''){
			alert(document.getElementById('lbl_traksi').innerHTML + ' ' + document.getElementById('alertrequired').value);	
		}		
		else if(coa=='') { 
			alert(document.getElementById('lbl_coa').innerHTML + ' ' + document.getElementById('alertrequired').value);		
		} 
		else {
			if(confirm('Yakin akan menyimpan data ini?')){
				param='nodok='+nodok+'&tanggal='+tanggal+'&untukunit='+untukunit;
				param+='&oms='+oms+'&penerima='+penerima+'&nospb='+nospb;
				param+='&catatan='+catatan+'&kodebarang='+kodebarang+'&satuan='+satuan;
				param+='&qty='+qty+'&kma='+kma+'&pemilikbarang='+pemilikbarang;
				param+='&traksi='+traksi+'&coa='+coa+'&jenis='+jenis+'&tipeop='+tipeop;
				param+='&method='+method+'&gudang='+gudang;
				tujuan='log_slave_saveBast.php';
				post_response_text(tujuan, param, respog);
				disableHeader();
				document.getElementById('qty').style.backgroundColor='red';
			}			
		}
	}

	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('qty').style.backgroundColor='#ffffff';
					nextItem();
					document.getElementById('bastcontainer').innerHTML=con.responseText;
					//setelah menyimpan 1 baris yakinkan method adalah insert
					document.getElementById('method').value='insert';
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function getBastList(gudang){
		param='gudang='+gudang;
		tujuan = 'log_slave_getBastList.php';
		post_response_text(tujuan, param, respog);
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('containerlist').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}

function delBast(notransaksi,kodebarang,kodeblok){
        untukunit	=document.getElementById('untukunit');
		untukunit=trim(untukunit.options[untukunit.selectedIndex].value);
		pemilikbarang = document.getElementById('pemilikbarang');
		pemilikbarang=trim(pemilikbarang.options[pemilikbarang.selectedIndex].value);
		param='nodok='+notransaksi+'&kodebarang='+kodebarang;
		param+='&delete=true&blok='+kodeblok+'&pemilikbarang='+pemilikbarang;
		param+='&untukunit='+untukunit;
		tujuan='log_slave_saveBast.php';
		if(confirm('Deleting Document '+notransaksi+', are you sure..?'))
			post_response_text(tujuan, param, respog);	
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('bastcontainer').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}

function editBast(kodebarang,namabarang,satuan,jumlah,kma,traksi,coa){
    //set blok karena merupakan primary
    //document.getElementById('blok').innerHTML="<option value=''></option><option value='"+kodeblok+"'>"+kodeblok+"</option>";
  	//document.getElementById('subunit').innerHTML="<option value='"+kodeblok+"'>"+kodeblok+"</option>";
	document.getElementById('kodebarang').value=kodebarang;
	document.getElementById('kodebarang').disabled=true;
	
	document.getElementById('namabarang').value=namabarang;
	document.getElementById('namabarang').disabled=true;
	
	document.getElementById('satuan').value=satuan;
	document.getElementById('satuan').disabled=true;
	
	document.getElementById('qty').value=jumlah;
	
	kmafields = document.getElementById('kma');
	for(x=0;x<kmafields.length;x++){
		if(kmafields.options[x].value==kma){
			kmafields.options[x].selected=true;
		}
	}	
	
	traksifields = document.getElementById('traksi');
	for(x=0;x<traksifields.length;x++){
		if(traksifields.options[x].value==traksi){
			traksifields.options[x].selected=true;
		}
	}
	
	coafields = document.getElementById('coa');
	for(x=0;x<coafields.length;x++){
		if(coafields.options[x].value==coa){
			coafields.options[x].selected=true;
		}
	}
   document.getElementById('method').value='update';
   disableHeader();	
}

function delXBapb(nodok){
	if(confirm('Deleting Doc: '+nodok+', Are sure..?')){
		param='notransaksi='+nodok;
		tujuan='log_slave_deleteBapb.php';//file ini berfungsi untuk penerimaan dan pengeluaran
	    if(confirm('All data in this document will be removed. Continue ?')){
			post_response_text(tujuan, param, respog);
	   }   
	}
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
						setSloc('simpan');
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}		
}


function editXBast(notransaksi,untukunit,tanggal,namapenerima,keterangan,oms,nospb,tipeop,jenis){
	nextItem();
	document.getElementById('nodok').value = notransaksi;
	document.getElementById('tanggal').value=tanggal;
	document.getElementById('penerima').value=namapenerima;        
	document.getElementById('catatan').value=keterangan;
	document.getElementById('nospb').value=nospb;
	document.getElementById('tipeop').value=tipeop;
	document.getElementById('jenis').value=jenis;
	if((namapenerima.substr(0,3)=='000')&&(namapenerima.length==10)){
			
	}
	else{
		if(namapenerima!='masyarakat')document.getElementById('catatan').value+=' received by:'+namapenerima;
	}

	unt=document.getElementById('untukunit');
	for(x=0;x<unt.length;x++){
		if(unt.options[x].value==untukunit){
			unt.options[x].selected=true;
		}
	}
	
	omsoption=document.getElementById('oms');
	for(x=0;x<omsoption.length;x++){
		if(omsoption.options[x].value==oms){
			omsoption.options[x].selected=true;
		}
	}
	disableHeader();
    tabAction(document.getElementById('tabFRM0'),0,'FRM',1);//jangan tanya darimana	
	loadSubunit(untukunit,'0');
	tujuan='log_slave_saveBast.php';
	param='nodok='+notransaksi+'&displayonly=true';
    post_response_text(tujuan, param, respog);
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('bastcontainer').innerHTML=con.responseText;
					loadSubunit(untukunit,namapenerima);
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function cariBast(num){
	tex=trim(document.getElementById('txtbabp').value);
	gudang = document.getElementById('sloc').options[document.getElementById('sloc').selectedIndex].value;
    if(gudang ==''){
		alert('Storage Location  is obligatory')
	}
	else{
		param='gudang='+gudang;
		param+='&page='+num;
		if(tex!='')
		param+='&tex='+tex;
		tujuan = 'log_slave_getBastList.php';
		post_response_text(tujuan, param, respog);			
	}
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('containerlist').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}


function previewBast(notransaksi,ev){
   param='notransaksi='+notransaksi;
   tujuan = 'log_slave_print_bast_pdf.php?'+param;	
   //display window
   title=notransaksi;
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);   
}

function filterTraksi(){
	traksi = document.getElementById('traksi').value;
	oms    = document.getElementById('oms').value;
	tipeop = document.getElementById('tipeop').value;	
	param  = 'method=filtertraksi&traksi='+traksi+'&tipeop='+tipeop+'&oms='+oms;
	tujuan = 'log_slave_spk_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('kma').innerHTML=con.responseText;
					document.getElementById('kma').disabled=false;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function filterKma(){
	kma = document.getElementById('kma').value;
	oms    = document.getElementById('oms').value;
	tipeop = document.getElementById('tipeop').value;	
	param='method=filterxxx&kma='+kma+'&tipeop='+tipeop+'&oms='+oms;
	tujuan = 'log_slave_spk_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					document.getElementById('traksi').innerHTML=con.responseText;
					document.getElementById('traksi').disabled=false;
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}

function filter(){
	if(document.getElementById('jenis').value=='U'){
		document.getElementById('oms').disabled=true;
		document.getElementById("oms").selectedIndex = "0";
		document.getElementById('kma').disabled=true;
		document.getElementById("kma").selectedIndex = "0";
		document.getElementById('traksi').disabled=true;
		document.getElementById("traksi").selectedIndex = "0";
		document.getElementById('tipeop').disabled=true;
		document.getElementById("tipeop").selectedIndex = "0";
	}
	else if(document.getElementById('jenis').value=='T'){
		document.getElementById('oms').disabled=false;
		document.getElementById('kma').disabled=false;
		document.getElementById('traksi').disabled=false;
		document.getElementById('tipeop').disabled=false;
	}
	
	jenis  = document.getElementById('jenis').value;
	oms    = document.getElementById('oms').value;
	tipeop = document.getElementById('tipeop').value;
	
	/* Traksi, Operation, Batu Bara*/
	if(jenis=='T' && oms=='O' && tipeop=='MS'){
		filter1 = 'TO1';
		document.getElementById('kma').disabled=true;
		document.getElementById("kma").selectedIndex = "0";
		var method = 'filtergrup';
	}
	
	/* Traksi, Maintenance, Batu Bara */
	else if(jenis=='T' && oms=='M' && tipeop=='MS'){
		filter1 = 'TM1';
		document.getElementById('traksi').disabled=true;
		document.getElementById("traksi").selectedIndex = "0";	
		var method = 'filterkma';
	}
	
	/* Traksi, Service, Batu Bara */
	else if(jenis=='T' && oms=='S' && tipeop=='MS'){
		filter1 = 'TS1';
		document.getElementById('traksi').disabled=true;
		document.getElementById("traksi").selectedIndex = "0";
		var method = 'filterkma';	
	}	
	
	/* Traksi, Operation, Pembangkit */
	else if(jenis=='T' && oms=='O' && tipeop=='OMS'){
		filter1 = 'TO2';
		document.getElementById('traksi').disabled=true;
		document.getElementById("traksi").selectedIndex = "0";
		var method = 'filterkma';	
	}
	
	/* Traksi, Maintenance, Pembangkit */
	else if(jenis=='T' && oms=='M' && tipeop=='OMS'){
		filter1 = 'TM2';
		document.getElementById('traksi').disabled=true;
		document.getElementById("traksi").selectedIndex = "0";
		var method = 'filterkma';	
	}
	
	/* Traksi, Service, Pembangkit */
	else if(jenis=='T' && oms=='S' && tipeop=='OMS'){
		filter1 = 'TS2';
		document.getElementById('traksi').disabled=true;
		document.getElementById("traksi").selectedIndex = "0";	
		var method = 'filterkma';	
	}	
	else {
		filter1 = '';
		var method = '';
	}
	
	param='method='+method+'&filter='+filter1+'&tipeop='+tipeop+'&oms='+oms;
	//alert(param);
	tujuan = 'log_slave_spk_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				}
				else {
					/* Traksi, Operation, Batu Bara*/
					if(jenis=='T' && oms=='O' && tipeop=='MS'){
						document.getElementById('traksi').innerHTML=con.responseText;
					}
					
					/* Traksi, Maintenance, Batu Bara */
					else if(jenis=='T' && oms=='M' && tipeop=='MS'){
						document.getElementById('kma').innerHTML=con.responseText;
					}
					
					/* Traksi, Service, Batu Bara */
					else if(jenis=='T' && oms=='S' && tipeop=='MS'){
						//alert(con.responseText);
						document.getElementById('kma').innerHTML=con.responseText;	
						document.getElementById('kma').setAttribute('id', 'kma');	
						document.getElementById('kma').setAttribute('onchange', 'filterKma()');	
						document.getElementById("traksi").removeAttribute("onchange");
					}	
					
					/* Traksi, Operation, Pembangkit */
					else if(jenis=='T' && oms=='O' && tipeop=='OMS'){
						document.getElementById('kma').innerHTML=con.responseText;
					}
					
					/* Traksi, Maintenance, Pembangkit */
					else if(jenis=='T' && oms=='M' && tipeop=='OMS'){
						document.getElementById('kma').innerHTML=con.responseText;
					}
					
					/* Traksi, Service, Pembangkit */
					else if(jenis=='T' && oms=='S' && tipeop=='OMS'){
						document.getElementById('kma').innerHTML=con.responseText;
					}	
					else {
						document.getElementById('kma').innerHTML=con.responseText;
					}					
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}	
}
