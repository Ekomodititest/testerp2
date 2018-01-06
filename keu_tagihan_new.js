function getCounter(){
	noawal=document.getElementById('nocountawal').value;
	noakhir=document.getElementById('nocountakhir').value;
	pilihtipe=document.getElementById('pilihtipe').options[document.getElementById('pilihtipe').selectedIndex].value;
	
	nocounter=noawal+pilihtipe+'/'+noakhir;
	document.getElementById('nocounter').value=nocounter;
}


function resetHeader(){
	document.getElementById('noinv').value='';
	document.getElementById('tanggalinv').value='';
	document.getElementById('pilihvendor').options[0].selected=true;
	document.getElementById('npwp').value='';
	document.getElementById('pilihbank').options[0].selected=true;
	document.getElementById('kodebank').value='';
	document.getElementById('rekbank').value='';
	document.getElementById('jatuhtempo').value='';
	
	document.getElementById('ftpajak').value='';
	document.getElementById('tanggalft').value='';
	document.getElementById('pilihmtuang').options[0].selected=true;
	document.getElementById('kurs').value='';
	document.getElementById('pilihtipe').options[0].selected=true;
	document.getElementById('pilihpmb').options[0].selected=true;
	document.getElementById('pilihdok').options[0].selected=true;
	document.getElementById('keterangan').value='';
	document.getElementById('total').value=0;
	resetSummary();
	getSelisih();getNett();hitungPPn();hitungPPh();hitungPBBKB();getSubTotal();
	
}

function resetSummary(){
	document.getElementById('total').value=0;
	document.getElementById('totalawal').value=0;
	document.getElementById('diskon').value=0;
	document.getElementById('nett').value=0;
	document.getElementById('pilihppn').options[0].selected=true;
	document.getElementById('persenppn').value=0;	
	document.getElementById('nilaippn').value=0;	
	document.getElementById('pilihpph').options[0].selected=true;
	document.getElementById('persenpph').value=0;	
	document.getElementById('nilaipph').value=0;		
	document.getElementById('pilihpbbkb').options[0].selected=true;
	document.getElementById('persenpbbkb').value=0;	
	document.getElementById('nilaipbbkb').value=0;	
	document.getElementById('subtotal1').value=0;	
	document.getElementById('subtotal2').value=0;	
	document.getElementById('additional').value=0;	
	document.getElementById('deduction').value=0;	
	document.getElementById('grtotal').value=0;	
	document.getElementById('pilihcoa').options[0].selected=true;
}

function checkinv(){
	noinv=document.getElementById('noinv').value;
	noinvinsdhada=document.getElementById('noinvinsdhada').value;
	param='noinv='+noinv+'&method=checkinv';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						if(con.responseText>0){
							alert(noinvinsdhada);
							document.getElementById('noinv').value='';
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


function getTrans(){
	pilihdok=document.getElementById('pilihdok').options[document.getElementById('pilihdok').selectedIndex].value;
	dokln=document.getElementById('dokln').value;
	coatxt=document.getElementById('coatxt').value;
	kgtxt=document.getElementById('kgtxt').value;
	if (pilihdok==dokln){
		document.getElementById('txtkg').innerHTML=coatxt;
	}
	else {
		document.getElementById('txtkg').innerHTML=kgtxt;
	}
	
	param='dok='+pilihdok+'&method=getTrans';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						ar=con.responseText.split("###");	
						document.getElementById('pilihtrans').innerHTML=ar[0];
						//document.getElementById('tipetrans').value=ar[1];
						document.getElementById('total').value=0;
						document.getElementById('nett').value=0;
						/*if (ar[2]==1){
							document.getElementById('total').disabled=false;
						}
						else if (ar[2]==0) {
							document.getElementById('total').disabled=true;
						}*/
						
						
						
					}
			}
			else {
					busy_off();
					error_catch(con.status);
					
			}
		}	
	}
	
	 	
}

function getDetailTotal(){
	
	pilihdok=document.getElementById('pilihdok').value;
	dokpo=document.getElementById('dokpo').value;
	dokpibpo=document.getElementById('dokpibpo').value;
	dokln=document.getElementById('dokln').value;
	if (pilihdok==dokpo){
		pilihtrans=document.getElementById('pilihtrans').value;
		param='transno='+pilihtrans+'&method=showPO';
		tujuan='keu_slave_tagihan_new.php';
		post_response_text(tujuan, param, respog);
		function respog(){
			if(con.readyState==4){
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
						}
						else {
							//tabAction(document.getElementById('tabFRM1'),1,'FRM',2);
							document.getElementById('container1').innerHTML=con.responseText;
							getTotal(0);
							
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
			}	
		} 
	}
	
	else {

		getTotal(0);
		
	}
		
}

function getVendor(){
	pilihdok=document.getElementById('pilihdok').value;
	pilihtrans=document.getElementById('pilihtrans').value;
	dokpo=document.getElementById('dokpo').value;
	dokspk=document.getElementById('dokspk').value;
	dokbaspk=document.getElementById('dokbaspk').value;
	dokpibpo=document.getElementById('dokpibpo').value;
	if(pilihdok==dokpo || pilihdok==dokpibpo){
		param='transno='+pilihtrans+'&method=getVendor';
		tujuan='keu_slave_tagihan_new.php';
		post_response_text(tujuan, param, respog);
		function respog(){
			if(con.readyState==4){
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
						}
						else {
							optvendor=document.getElementById('pilihvendor');
							for(x=0;x<optvendor.length;x++){
									if(optvendor.options[x].value==con.responseText)
									   optvendor.options[x].selected=true;
							}
							getNPWP();
							document.getElementById('kodebank').value='';
							document.getElementById('rekbank').value='';
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
			}	
		} 
	}
	
	
}


function getNPWP(){
	pilihvendor=document.getElementById('pilihvendor').options[document.getElementById('pilihvendor').selectedIndex].value;
	param='vendor='+pilihvendor+'&method=getNPWP';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						document.getElementById('npwp').value=con.responseText;
						getBank();
					}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}	
	} 	
}



function getBank(){
	pilihvendor=document.getElementById('pilihvendor').options[document.getElementById('pilihvendor').selectedIndex].value;
	param='vendor='+pilihvendor+'&method=getBank';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						document.getElementById('pilihbank').innerHTML=con.responseText;
					}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
		}	
	} 	
}

function getKodeBank(){
	pilihbank=document.getElementById('pilihbank').options[document.getElementById('pilihbank').selectedIndex].value;
	param='bank='+pilihbank+'&method=getKodeBank';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						ar=con.responseText.split("###");
						document.getElementById('kodebank').value=ar[0];
						document.getElementById('rekbank').value=ar[1];
					}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
		}	
	} 	
}

function getDefaultKurs(){
	pilihmtuang=document.getElementById('pilihmtuang').options[document.getElementById('pilihmtuang').selectedIndex].value;
	param='matauang='+pilihmtuang+'&method=getDefaultKurs';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		if(con.readyState==4){
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						if(con.responseText==1){
							document.getElementById('kurs').value=1;
							document.getElementById('kurs').disabled=true;
							
						}
						else {
							document.getElementById('kurs').value=0;
							document.getElementById('kurs').disabled=false;
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

function lanjutHeader(){
	
	tabAction(document.getElementById('tabFRM1'),1,'FRM',2);
}

function lanjutDetail(){
	tabAction(document.getElementById('tabFRM2'),2,'FRM',2);
}

function key()

{

    if(window.event.keyCode == "40") // Drow Arrow Key...
        window.event.keyCode = "9";

}


function simpanHeaderSummary(){
	nocounter=document.getElementById('nocounter').value;
	noinv=document.getElementById('noinv').value;
	tanggalinv=document.getElementById('tanggalinv').value;
	pilihvendor=document.getElementById('pilihvendor').options[document.getElementById('pilihvendor').selectedIndex].value;
	npwp=document.getElementById('npwp').value;
	pilihbank=document.getElementById('pilihbank').options[document.getElementById('pilihbank').selectedIndex].value;
	kodebank=document.getElementById('kodebank').value;
	rekbank=document.getElementById('rekbank').value;
	jatuhtempo=document.getElementById('jatuhtempo').value;
	
	ftpajak=document.getElementById('ftpajak').value;
	tanggalft=document.getElementById('tanggalft').value;
	pilihmtuang=document.getElementById('pilihmtuang').options[document.getElementById('pilihmtuang').selectedIndex].value;
	kurs=remove_comma(document.getElementById('kurs'));
	pilihpmb=document.getElementById('pilihpmb').options[document.getElementById('pilihpmb').selectedIndex].value;
	pilihdok=document.getElementById('pilihdok').options[document.getElementById('pilihdok').selectedIndex].value;
	if (pilihdok!=''){
		pilihtrans=document.getElementById('pilihtrans').options[document.getElementById('pilihtrans').selectedIndex].value;
	}
	else{
		pilihtrans='';
	}
	pilihtipe=document.getElementById('pilihtipe').options[document.getElementById('pilihtipe').selectedIndex].value;
	keterangan=document.getElementById('keterangan').value;
	total=remove_comma(document.getElementById('total'));
	diskon=remove_comma(document.getElementById('diskon'));
	selisih=remove_comma(document.getElementById('selisih'));
	nett=remove_comma(document.getElementById('nett'));
	ppn=document.getElementById('pilihppn').value;
	ppns=ppn.split('-');
	kodeppn=ppns[0];
	persenppn=ppns[1];
	nilaippn=remove_comma(document.getElementById('nilaippn'));
	pph=document.getElementById('pilihpph').value;
	pphs=pph.split('-');
	kodepph=pphs[0];
	persenpph=pphs[1];
	nilaipph=remove_comma(document.getElementById('nilaipph'));
	pbbkb=document.getElementById('pilihpbbkb').value;
	pbbkbs=pbbkb.split('-');
	kodepbbkb=pbbkbs[0];
	persenpbbkb=pbbkbs[1];
	nilaipbbkb=remove_comma(document.getElementById('nilaipbbkb'));
	subtotal=remove_comma(document.getElementById('subtotal1'));
	penambah=remove_comma(document.getElementById('additional'));
	pengurang=remove_comma(document.getElementById('deduction'));
	grandtotal=remove_comma(document.getElementById('grtotal'));
	pilihcoa=document.getElementById('pilihcoa').options[document.getElementById('pilihcoa').selectedIndex].value;
	
	cnfsimpan=document.getElementById('cnfsimpan').value;
	alsimpan=document.getElementById('alsimpan').value;
	altdlengkap=document.getElementById('altdlengkap').value;
	dokpo=document.getElementById('dokpo').value;
	dokln=document.getElementById('dokln').value;
	method=document.getElementById('method').value;
	param='nocounter='+nocounter+"&noinv="+noinv+"&tanggalinv="+tanggalinv+"&pilihvendor="+pilihvendor;
	param+='&npwp='+npwp+"&pilihbank="+pilihbank+"&kodebank="+kodebank;
	param+='&rekbank='+rekbank+"&jatuhtempo="+jatuhtempo+"&ftpajak="+ftpajak;
	param+='&tanggalft='+tanggalft+"&pilihmtuang="+pilihmtuang+"&kurs="+kurs;
	param+='&pilihtipe='+pilihtipe+'&pilihpmb='+pilihpmb+"&pilihdok="+pilihdok+"&pilihtrans="+pilihtrans;
	param+='&keterangan='+keterangan+'&total='+total+'&diskon='+diskon+'&selisih='+selisih;
	param+='&nett='+nett+'&kodeppn='+kodeppn+'&persenppn='+persenppn;
	param+='&nilaippn='+nilaippn+'&kodepph='+kodepph+'&persenpph='+persenpph;
	param+='&nilaipph='+nilaipph+'&kodepbbkb='+kodepbbkb+'&persenpbbkb='+persenpbbkb;
	param+='&nilaipbbkb='+nilaipbbkb+'&subtotal='+subtotal+'&penambah='+penambah;
	param+='&pengurang='+pengurang+'&grandtotal='+grandtotal+'&pilihcoa='+pilihcoa;
	param+='&method='+method;
	tujuan='keu_slave_tagihan_new.php';
	
	if (noinv=='' || tanggalinv=='' || pilihvendor=='' || pilihbank=='' || pilihtipe=='' || jatuhtempo==''|| pilihmtuang==''|| pilihpmb=='' || pilihdok==''|| pilihtrans=='' || (selisih!=0 && selisih!='' && pilihcoa=='')){
		alert(altdlengkap);
	}
	else {
		if(confirm(cnfsimpan)){
		   post_response_text(tujuan, param, respog);
		}
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
						//var countrow = document.getElementById("detailpo").rows.length;
						if (pilihdok==dokpo){
							if (a[2]=='0'){
								alert(a[0]);
								resetHeader();
								resetSummary();
								loadData();
							}
							else if (a[2]=='1'){
								
								simpanDetail();
							}
							
						}
						else  {
							alert(a[0]);
							resetHeader();
							resetSummary();
							loadData();
							//alert(alsimpan);
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

function simpanDetail(){
	nocounter=document.getElementById('nocounter').value;
	nomax=document.getElementById('nomax').value;
	alsimpan=document.getElementById('alsimpan').value;
	var kobar=[];
	var nabar=[];
	var jmbar=[];
	var satuan=[];
	var harga=[];
	var nilai=[];
	for(i=1;i<=nomax;i++){
		kobar[i]=document.getElementById('kdbrg'+i).innerHTML;
		nabar[i]=document.getElementById('nmbrg'+i).innerHTML;
		jmbar[i]=document.getElementById('jmbrg'+i).innerHTML;
		satuan[i]=document.getElementById('satuan'+i).innerHTML;
		harga[i]=document.getElementById('harga'+i).innerHTML;
		nilai[i]=document.getElementById('nilai'+i).innerHTML;
		
	}
		
	param+='&kobar='+JSON.stringify(kobar)+'&nabar='+JSON.stringify(nabar)+'&jmbar='+JSON.stringify(jmbar);
	param+='&satuan='+JSON.stringify(satuan)+'&harga='+JSON.stringify(harga)+'&nilai='+JSON.stringify(nilai);
	param+='&nocounter='+nocounter+'&nomax='+nomax+'&method=insertDetail'
	tujuan = 'keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);			
	function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
						}
						else {
							var a=con.responseText.split('|');
							alert(a[0]);
							//alert(alsimpan);
							resetHeader();
							resetSummary();
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

function cariBast(num){
	
	pilihtrans=document.getElementById('pilihtrans').value;
	
	param='transno='+pilihtrans+'&method=showPO';
		
	param+='&page='+num;
	
	tujuan = 'keu_slave_tagihan_new.php';
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

function cariList(num){
	filter=document.getElementById('filter').options[document.getElementById('filter').selectedIndex].value;
	keyword=document.getElementById('keyword').value;
	tglcari=document.getElementById('tglcari').value;
	param='method=showHeader';
		
	param+='&page='+num+'&filter='+filter+'&keyword='+keyword+'&tglcari='+tglcari;
	
	tujuan = 'keu_slave_tagihan_new.php';
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

function getTotal(t){
	pilihtrans=document.getElementById('pilihtrans').value;
	pilihdok=document.getElementById('pilihdok').value;
	dokpo=document.getElementById('dokpo').value;
	dokspk=document.getElementById('dokspk').value;
	dokbaspk=document.getElementById('dokbaspk').value;
	dokpibpo=document.getElementById('dokpibpo').value;
	param='transno='+pilihtrans+'&dok='+pilihdok+'&method=getTotal';
			
	tujuan = 'keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);			
	function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
						}
						else {
							var a=con.responseText.split('|');
							if(t==0){
								document.getElementById('total').value=a[0];
								document.getElementById('totalawal').value=a[0];
							}
							
							//document.getElementById('totalawal').value=a[0];
							
							change_number(document.getElementById('total'));
							change_number(document.getElementById('totalawal'));
							if (pilihdok==dokpo){
								optppn=document.getElementById('pilihppn');
								for(x=0;x<optppn.length;x++){
									var b=(optppn.options[x].value).split('-');
									if(b[1]==a[1])
									   optppn.options[x].selected=true;
								}
								optppn.disabled = true;
								
								optpph=document.getElementById('pilihpph');
								for(x=0;x<optpph.length;x++){
									var b=(optpph.options[x].value).split('-');
									if(b[1]==a[2])
									   optpph.options[x].selected=true;
								}
								optpph.disabled = true;
								
								optpbbkb=document.getElementById('pilihpbbkb');
								for(x=0;x<optpbbkb.length;x++){
									var b=(optpbbkb.options[x].value).split('-');
									if(b[1]==a[3])
									   optpbbkb.options[x].selected=true;
								}
								optpbbkb.disabled = true;
							}
							else if (pilihdok==dokspk|| pilihdok==dokbaspk){
								optppn=document.getElementById('pilihppn');
								for(x=0;x<optppn.length;x++){
									var b=(optppn.options[x].value).split('-');
									if(b[0]==a[1])
									   optppn.options[x].selected=true;
								}
								optppn.disabled = true;
								
								optpph=document.getElementById('pilihpph');
								for(x=0;x<optpph.length;x++){
									var b=(optpph.options[x].value).split('-');
									if(b[0]==a[2])
									   optpph.options[x].selected=true;
								}
								optpph.disabled = true;
								
								optpbbkb=document.getElementById('pilihpbbkb');
								for(x=0;x<optpbbkb.length;x++){
									var b=(optpbbkb.options[x].value).split('-');
									if(b[0]==a[3])
									   optpbbkb.options[x].selected=true;
								}
								optpbbkb.disabled = true;
							}
							else if(pilihdok==dokpibpo){
								//rubah nilai jadi sebagai total ==Jo 23-03-2017==
								optppn=document.getElementById('pilihppn');
								optpph=document.getElementById('pilihpph');
								optpbbkb=document.getElementById('pilihpbbkb');
								optppn.disabled = true;
								optpph.disabled = true;
								optpbbkb.disabled = true;
								//document.getElementById('pilihcoa').disabled=false;
								/*document.getElementById('total').value=0;
								document.getElementById('total').disabled=true;
								document.getElementById('diskon').disabled=true;*/
								
								showKegiatanPIB();
							}
							
							getSelisih();getNett();hitungPPn();hitungPPh();hitungPBBKB();getSubTotal();
							pilihdok=document.getElementById('pilihdok').value;
							dokpo=document.getElementById('dokpo').value;
							dokpibpo=document.getElementById('dokpibpo').value;
							if(pilihdok==dokpo || pilihdok==dokpibpo){
								if(t==0){
									getVendor();
								}
								
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

function showKegiatanPIB(){
	param='method=getKegPIB';
	tujuan = 'keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);			
	function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
						}
						else {
							document.getElementById('pilihcoa').innerHTML=con.responseText;
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
			}
	}
}

function cekkosong(){
	total=document.getElementById('total').value;
	if (total==''){
		document.getElementById('total').value='0';
	}
	kurs=document.getElementById('kurs').value;
	if (kurs==''){
		document.getElementById('kurs').value='0';
	}
	diskon=document.getElementById('diskon').value;
	if (diskon==''){
		document.getElementById('diskon').value='0';
	}
	change_number(document.getElementById('nett'));
	penambah=document.getElementById('additional').value;
	if (penambah==''){
		document.getElementById('additional').value='0';
	}
	pengurang=document.getElementById('deduction').value;
	if (pengurang==''){
		document.getElementById('deduction').value='0';
	}
}

function getSelisih(){
	pilihdok=document.getElementById('pilihdok').options[document.getElementById('pilihdok').selectedIndex].value;
	dokln=document.getElementById('dokln').value;
	dokcip=document.getElementById('dokcip').value;
	dokpibpo=document.getElementById('dokpibpo').value;
	totalawal=remove_comma(document.getElementById('totalawal'));
	total=remove_comma(document.getElementById('total'));
	diskon=remove_comma(document.getElementById('diskon'));
	sldisc = (parseFloat(diskon)/100)*parseFloat(total);//selisih diskon
	//rubah jadi dok  cip jg dari 0 ==Jo 20-03-2017==
	if (pilihdok==dokln || pilihdok==dokcip || (pilihdok!=dokln && totalawal==0)){
		slsh=sldisc;
	}
	else {
		slsh=(parseFloat(totalawal)-parseFloat(total))+sldisc;//total selisih
	}
	document.getElementById('selisih').value=slsh;
	change_number(document.getElementById('selisih'));
	/*if(pilihdok==dokln){
		document.getElementById('pilihcoa').disabled=false;
	}
	else {
		if(slsh==0){
			document.getElementById('pilihcoa').disabled=true;
		}
		else {
			document.getElementById('pilihcoa').disabled=false;
		}
	}*/
	if(slsh==0 && pilihdok!=dokpibpo){
		document.getElementById('pilihcoa').disabled=true;
	}
	else {
		document.getElementById('pilihcoa').disabled=false;
	}
	
	
}

function getNett(){
	total=remove_comma(document.getElementById('total'));
	diskon=remove_comma(document.getElementById('diskon'));
	nett = parseFloat(total) - ((parseFloat(diskon)/100)*parseFloat(total));
	document.getElementById('nett').value=nett;
	change_number(document.getElementById('nett'));
}

function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('container1').innerHTML = '';
	document.getElementById('listdata').style.display = 'none';
	resetHeader();
}

function loadData(){
        param="method=showHeader&filter=&keyword=";
        tujuan = 'keu_slave_tagihan_new.php';
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
	location.reload();
}

function hitungPPn(){
	pilihppn=document.getElementById('pilihppn').options[document.getElementById('pilihppn').selectedIndex].value;
	ar=pilihppn.split("-");
	nett=remove_comma(document.getElementById('nett'));
	document.getElementById('persenppn').value=ar[1];
	document.getElementById('nilaippn').value=(parseFloat(ar[1])/100)*parseFloat(nett);
	change_number(document.getElementById('nilaippn'));
}

function hitungPPh(){
	pilihpph=document.getElementById('pilihpph').options[document.getElementById('pilihpph').selectedIndex].value;
	ar=pilihpph.split("-");
	nett=remove_comma(document.getElementById('nett'));
	document.getElementById('persenpph').value=ar[1];
	document.getElementById('nilaipph').value=(parseFloat(ar[1])/100)*parseFloat(nett);
	change_number(document.getElementById('nilaipph'));
}
function hitungPBBKB(){
	pilihpbbkb=document.getElementById('pilihpbbkb').options[document.getElementById('pilihpbbkb').selectedIndex].value;
	ar=pilihpbbkb.split("-");
	nett=remove_comma(document.getElementById('nett'));
	document.getElementById('persenpbbkb').value=ar[1];
	document.getElementById('nilaipbbkb').value=(parseFloat(ar[1])/100)*parseFloat(nett);
	change_number(document.getElementById('nilaipbbkb'));
}
function getSubTotal(){
	nett=remove_comma(document.getElementById('nett'));
	ppn=remove_comma(document.getElementById('nilaippn'));
	pph=remove_comma(document.getElementById('nilaipph'))
	pbbkb=remove_comma(document.getElementById('nilaipbbkb'));
	document.getElementById('subtotal1').value=parseFloat(nett)+parseFloat(ppn)-parseFloat(pph)+parseFloat(pbbkb);
	document.getElementById('subtotal2').value=parseFloat(nett)+parseFloat(ppn)-parseFloat(pph)+parseFloat(pbbkb);
	change_number(document.getElementById('subtotal1'));
	change_number(document.getElementById('subtotal2'));
	
	subtotal=remove_comma(document.getElementById('subtotal1'));
	grandtotal=parseFloat(subtotal);
	document.getElementById('grtotal').value=grandtotal;
	change_number(document.getElementById('grtotal'));
	fillTerbilang();
}

function getGrandTotal(){
	subtotal=remove_comma(document.getElementById('subtotal1'));
	penambah=remove_comma(document.getElementById('additional'));
	pengurang=remove_comma(document.getElementById('deduction'));
	grandtotal=parseFloat(subtotal)+parseFloat(penambah)-parseFloat(pengurang);
	document.getElementById('grtotal').value=grandtotal;
	change_number(document.getElementById('grtotal'));
	fillTerbilang();
}

function fillTerbilang()
{
        obj=document.getElementById('grtotal');
        rupiahkan(obj,'terbilang');   
}	

function previewDetail(nocnt,noinv,ev)
{
	showDetail(nocnt,noinv,ev);
	rnocnt=nocnt;
	param='rnocnt='+rnocnt+'&method=getDetail';
	tujuan='keu_slave_tagihan_new.php';
	post_response_text(tujuan, param, respog);
	function respog()
	{
		  if(con.readyState==4)
		  {
				if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								document.getElementById('contDetail').innerHTML=con.responseText;
						}
						else {
								//alert(con.responseText);
								document.getElementById('contDetail').innerHTML=con.responseText;
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		  }	
	 }  

}

function showDetail(nocnt,noinv,ev)
{	
	title=document.getElementById('invdt').value;
	content="<fieldset><legend>"+noinv+"</legend><div id=contDetail style='overflow:auto; width:750px; height:450px;' ></div></fieldset><input type=hidden id=datcnt name=datcnt value="+noinv+" />";
	width='800';
	height='500';
	showDialog1(title,content,width,height,ev);	
}
function delheader(nocnt)
{	
	cnfdel=document.getElementById('alhapus').value;
	param='nocounter='+nocnt+'&method=deleteHeader';
	tujuan='keu_slave_tagihan_new.php';
	if(confirm(cnfdel)){
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
						window.location.reload();	
					}
			}
			else {
					busy_off();
					error_catch(con.status);
			}
				
		} 
	}
}

function editHeader(nocounter){
	param="method=getHeader&nocounter="+nocounter;
     tujuan='keu_slave_tagihan_new.php';
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
						
						
						document.getElementById('nocounter').value=a[0];
						document.getElementById('noinv').value=a[2];
						document.getElementById('tanggalinv').value=a[3];
						
						optvendor=document.getElementById('pilihvendor');
						for(x=0;x<optvendor.length;x++){
								if(optvendor.options[x].value==a[5])
								   optvendor.options[x].selected=true;
						}
						optvendor.disabled = false;
						document.getElementById('npwp').value=a[15];
						
						optbank=document.getElementById('pilihbank');
						for(x=0;x<optbank.length;x++){
								if(optbank.options[x].value==a[6])
								   optbank.options[x].selected=true;
						}
						optbank.disabled = false;
						document.getElementById('kodebank').value=a[16];
						document.getElementById('rekbank').value=a[17];
						
						opttipe=document.getElementById('pilihtipe');
						for(x=0;x<opttipe.length;x++){
								if(opttipe.options[x].value==a[1])
								   opttipe.options[x].selected=true;
						}
						opttipe.disabled = false;
						
						document.getElementById('jatuhtempo').value=a[4];
						document.getElementById('ftpajak').value=a[7];
						document.getElementById('tanggalft').value=a[8];
						
						optmtuang=document.getElementById('pilihmtuang');
						
						for(x=0;x<optmtuang.length;x++){
								if(optmtuang.options[x].value==a[9])
								   optmtuang.options[x].selected=true;
						}
						//cek jika merupakan mata uang default ==Jo 20-03-2017==
						mtuangdf=document.getElementById('mtuangdf').value;
						if(a[9]==mtuangdf){
							optmtuang.disabled = true;
						}
						else {
							optmtuang.disabled = false;
						}
						
						
						document.getElementById('kurs').value=a[10];
						
						optpmb=document.getElementById('pilihpmb');
						for(x=0;x<optpmb.length;x++){
								if(optpmb.options[x].value==a[11])
								   optpmb.options[x].selected=true;
						}
						optpmb.disabled = false;
					
						optdok=document.getElementById('pilihdok');
						for(x=0;x<optdok.length;x++){
								if(optdok.options[x].value==a[12])
								   optdok.options[x].selected=true;
						}
						optdok.disabled = false;
						
						
						document.getElementById('pilihtrans').innerHTML=a[26];
						
						opttrans=document.getElementById('pilihtrans');
						for(x=0;x<opttrans.length;x++){
								if(opttrans.options[x].value==a[13])
								   opttrans.options[x].selected=true;
						}
						opttrans.disabled = false;
						document.getElementById('total').value=a[25];
						//Lain-Lain
						if (a[27]=='1'){
							document.getElementById('totalawal').value=a[28];
							
						}						
						else if (a[27]=='2'){//SPK, CIP
							document.getElementById('totalawal').value=a[28];
							
						}
						else if (a[27]=='3'){//pib atas po
							document.getElementById('totalawal').value=a[28];
							document.getElementById('total').value=0;
							document.getElementById('total').disabled=true;
							document.getElementById('diskon').disabled=true;							
							document.getElementById('pilihcoa').innerHTML=a[29];
						}
						else {//PO
							document.getElementById('container1').innerHTML=a[27];
							//document.getElementById('totalawal').value=a[28];
							getTotal(1);
					
						}
						
						
						
						document.getElementById('keterangan').value=a[14];
						
						document.getElementById('diskon').value=a[18];
						
						optppn=document.getElementById('pilihppn');
						for(x=0;x<optppn.length;x++){
								if(optppn.options[x].value==a[19])
								   optppn.options[x].selected=true;
						}
						optppn.disabled = false;
						
						optpph=document.getElementById('pilihpph');
						for(x=0;x<optpph.length;x++){
								if(optpph.options[x].value==a[20])
								   optpph.options[x].selected=true;
						}
						optpph.disabled = false;
						
						optpbbkb=document.getElementById('pilihpbbkb');
						for(x=0;x<optpbbkb.length;x++){
								if(optpbbkb.options[x].value==a[21])
								   optpbbkb.options[x].selected=true;
						}
						optpbbkb.disabled = false;
						
						if (a[27]!=1){
							optppn.disabled = true;
							optpph.disabled = true;
							optpbbkb.disabled = true;
						}
						
						document.getElementById('additional').value=a[22];
						document.getElementById('deduction').value=a[23];
						optcoa=document.getElementById('pilihcoa');
						for(x=0;x<optcoa.length;x++){
								if(optcoa.options[x].value==a[24])
								   optcoa.options[x].selected=true;
						}
						optcoa.disabled = false;
						//tabAction(document.getElementById('tabFRM2'),2,'FRM',2);
						cekkosong();getSelisih();getNett();hitungPPn();hitungPPh();hitungPBBKB();getSubTotal();getGrandTotal();
						method=document.getElementById('method').value='updateHeader';
						document.getElementById('form').style.display = '';
						document.getElementById('listdata').style.display = 'none';
					}
				}
		}
		else {
				busy_off();
				error_catch(con.status);
		}
	}	
}