/**
 * @author Developer
 */

function displayFormInput()
{
	tabAction(document.getElementById('tabFRM0'),0,'FRM',1);
	cancelAsset();
}

function displayList()
{
	tabAction(document.getElementById('tabFRM1'),1,'FRM',0);
}

function cek(obj)
{

    param='method=getKodeAkhir'+'&kdAset='+obj.options[obj.selectedIndex].value;
    tujuan = 'sdm_slave_save_daftarAsset2.php';
    post_response_text(tujuan, param, respog);
    function respog(){
                    if (con.readyState == 4) {
                            if (con.status == 200) {
                                    busy_off();
                                    if (!isSaveResponse(con.responseText)) {
                                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                    }
                                    else {
                                        if(obj.options[obj.selectedIndex].value=='BG')//bangunan
                                        {
                                                document.getElementById('kodebarang').value='';
                                                document.getElementById('namaaset').value='';
                                                document.getElementById('kodebarang').style.display='none';
                                        }
                                        else
                                        {
                                                document.getElementById('kodebarang').style.display='';
                                        }
                                        document.getElementById('kodeaset').value=con.responseText;
                                    }
                            }
                            else {
                                    busy_off();
                                    error_catch(con.status);
                            }
                    }
            }
	
}

function showWindowBarang(title,ev)
{
	  
	  content= "<div style='width:100%;'>";
	  content+="<fieldset>"+title+"<input type=text id=txtnamabarang class=myinputtext size=25 onkeypress=\"return enterEuy(event);\" maxlength=35><button class=mybutton onclick=goCariBarang()>Go</button> </fieldset>";
	  content+="<div id=containercari style='overflow:scroll;height:300px;width:520px'></div></div>";
     //display window
	   width='550';
	   height='350';
	   showDialog1(title,content,width,height,ev);		
}
function enterEuy(evt)
{
	key=getKey(evt);
	if(key==13)
	{
		goCariBarang();
	}
	else
	{
		return tanpa_kutip(evt);
	}
	
}

function goCariBarang()
{
		txtcari = trim(document.getElementById('txtnamabarang').value);

				if (txtcari.length < 3) {
					alert('material name min. 3 char');
				}
				else {
					param = 'txtcari=' + txtcari;
					tujuan = 'log_slave_cariBarangUmum.php';
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


function throwThisRow(kode,nama,satuan)
{
  document.getElementById('kodebarang').value=kode;
  document.getElementById('namaaset').value=nama;
  closeDialog();
}

function simpanAssetBaru()
{
	kodeorg			=trim(document.getElementById('kodeorg').options[document.getElementById('kodeorg').selectedIndex].value);
	tipe			=trim(document.getElementById('tipe').options[document.getElementById('tipe').selectedIndex].value);
	kodeasset		=trim(document.getElementById('kodeaset').value);
	kodebarang		=trim(document.getElementById('kodebarang').value);
	namaaset		=trim(document.getElementById('namaaset').value);
	tahunperolehan	=trim(document.getElementById('tahunperolehan').value);
	statu			=trim(document.getElementById('status').options[document.getElementById('status').selectedIndex].value);
	nilaiperolehan	=trim(document.getElementById('nilaiperolehan').value);
	jumlahbulan		=trim(document.getElementById('jumlahbulan').value);
	bulanawal		=trim(document.getElementById('bulanawal').options[document.getElementById('bulanawal').selectedIndex].value);
	//tglawalpenyusutan=document.getElementById('tgl_awal_susut').value;
	keterangan		=trim(document.getElementById('keterangan').value);
	penambah		=trim(document.getElementById('penambah').value);
	pengurang		=trim(document.getElementById('pengurang').value);
	leasing			=trim(document.getElementById('leasing').options[document.getElementById('leasing').selectedIndex].value);
	kdasset	    	=trim(document.getElementById('kdasset').value);
    lokasi	    	=trim(document.getElementById('lokasi').options[document.getElementById('lokasi').selectedIndex].value);
    met				=document.getElementById('method').value;
    tipesusut		=trim(document.getElementById('tipesusut').options[document.getElementById('tipesusut').selectedIndex].value);
	penyusutanpertahun		=trim(document.getElementById('penyusutanpertahun').value);
	usiabulan				=document.getElementById('usiabulan').value;
	nilaipenyusutanbulanberjalan = Math.ceil(document.getElementById('nilaipenyusutanbulanberjalanhide').value);
	//npbb = Math.ceil(nilaipenyusutanbulanberjalan)
	if(kodeorg=='' || tipe=='' || kodeasset==''  || namaaset=='' || tahunperolehan=='' || statu=='')
	{
		alert('Data inconsistent');
	}
	else if(jumlahbulan==0)
	{
		alert('Jumlah Bulan Penyusutan Tidak Boleh 0.');
	}
	else if(bulanawal=='')
	{
		alert('Bulan Awal Penyusutan Belum Dipilih.');
	}
	else
	{
		param='kodeorg='+kodeorg+'&tipe='+tipe+'&kodeasset='+kodeasset;
		param+='&kodebarang='+kodebarang+'&namaaset='+namaaset+'&tahunperolehan='+tahunperolehan+'&status='+statu;
		param+='&nilaiperolehan='+nilaiperolehan+'&jumlahbulan='+jumlahbulan+'&bulanawal='+bulanawal;
		param+='&keterangan='+keterangan+'&method='+met+'&leasing='+leasing+'&usiabulan='+usiabulan+'&nilaipenyusutanbulanberjalan='+nilaipenyusutanbulanberjalan;
		param+='&penambah='+penambah+'&pengurang='+pengurang+'&lokasi='+lokasi+'&kdasset='+kdasset+'&tipesusut='+tipesusut+'&penyusutanpertahun='+penyusutanpertahun;
		//alert(param);
                tujuan='sdm_slave_save_daftarAsset.php';
        if(confirm('Are you sure..?'))
		post_response_text(tujuan, param, respog);		
	}
	
	function respog()
	{
		      if(con.readyState==4)
		      {
			        if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR TRANSACTION,\n' + con.responseText);
						}
						else {
							//alert(con.responseText);
							document.getElementById('containeraset').innerHTML=con.responseText;
						    alert('Saved');
							cancelAsset2();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }
		
}

function cariAsset(page)
{
     tex=trim(document.getElementById('txtsearch').value);
	 param='';
	 if (tex == '') 
	 	param = '&page=' + page;
	 else {
	    param+="&txtcari="+tex;
	 }  
		tujuan = 'sdm_slave_save_daftarAsset.php';
		post_response_text(tujuan, param, respog);			

		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('containeraset').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}		 
}

function editAsset(kodeorg,tipeasset,kodeasset,namasset,kodebarang,tahunperolehan,stat,hargaperolehan,jlhblnpenyusutan,awalpenyusutan,keterangan,leasing,pena,peng,kdasset,lokasi,tipesusut,namasusut,bulanan,awalpenyusutan,NilaiPenyusutanBlnBerjalan,AkumulasiPenyusutan,UsiaBulan,SisaBulan,disable,penyusutanpertahun,update){
	
	if(NilaiPenyusutanBlnBerjalan == 0) {
		var DisableContent = false;
		
	} else {
		var DisableContent = true;
	}
	
	a=document.getElementById('kodeorg');
	for(x=0;x<a.length;x++)
	{
		if(a.options[x].value==kodeorg)
		{
			a.options[x].selected=true;
		}
	}
    a=document.getElementById('lokasi');
	for(x=0;x<a.length;x++)
	{
		if(a.options[x].value==lokasi)
		{
			a.options[x].selected=true;
			//document.getElementById('lokasi').disabled=true;
		}
		document.getElementById('lokasi').disabled=true;
		if(a.options[x].text==lokasi)
		{
			a.options[x].selected=true;
			//document.getElementById('lokasi').disabled=DisableContent;
		}
	}
	a=document.getElementById('tipe');
	for(x=0;x<a.length;x++)
	{
		if(a.options[x].value==tipeasset)
		{
			a.options[x].selected=true;
			document.getElementById('tipe').disabled=true;
		}
	}
	a=document.getElementById('status');
	for(x=0;x<a.length;x++)
	{
		/*if(a.options[x].value==stat)
		{
			a.options[x].selected=true;
		}*/
		if(a.options[x].text==stat)
		{
			a.options[x].selected=true;
		}
	}
	a=document.getElementById('leasing');
	for(x=0;x<a.length;x++)
	{
		if(a.options[x].value==leasing)
		{
			a.options[x].selected=true;
		}
	}
	a=document.getElementById('bulanawal');
	for(x=0;x<a.length;x++)
	{
		if(a.options[x].value==awalpenyusutan)
		{
			a.options[x].selected=true;
		}
	}
	a=document.getElementById('tipesusut');

	for(x=0;x<a.length;x++)
	{
		if(a.options[x].value==tipesusut)
		{
			a.options[x].selected=true;
			a.disabled = DisableContent;
		}
		if(a.options[x].text==namasusut)
		{
			a.options[x].selected=true;
			a.disabled = DisableContent;
		}
	}
	
	document.getElementById('kodeaset').value=kodeasset;
	document.getElementById('kodeaset').disabled=true;	
	document.getElementById('kodeorg').disabled=true;
	document.getElementById('namaaset').value=namasset;
	//document.getElementById('kodebarang').value=kodebarang;
	document.getElementById('kodebarang').value=keterangan;
	document.getElementById('kodebarang').disabled=true;
	document.getElementById('tahunperolehan').value=tahunperolehan;
	document.getElementById('tahunperolehan').disabled=true;
	document.getElementById('nilaiperolehan').value=hargaperolehan;
	document.getElementById('nilaiperolehan').disabled=true;
	
    document.getElementById('jumlahbulan').value=jlhblnpenyusutan;
	document.getElementById('jumlahbulan').disabled=DisableContent;
	
    document.getElementById('keterangan').value=keterangan;
    document.getElementById('penambah').value=pena;
    document.getElementById('pengurang').value=peng;
    document.getElementById('kdasset').value=kdasset;
	
    document.getElementById('nilaipenyusutanbulanberjalan').value=NilaiPenyusutanBlnBerjalan;
	document.getElementById('nilaipenyusutanbulanberjalanhide').value=NilaiPenyusutanBlnBerjalan;
	
	document.getElementById('penyusutanpertahun').value=penyusutanpertahun;
	document.getElementById('penyusutanpertahun').disabled=DisableContent;
	
    document.getElementById('akumulasipenyusutan').value=AkumulasiPenyusutan;
    document.getElementById('bulanan').value=bulanan;
    document.getElementById('usiabulan').value=UsiaBulan;
    document.getElementById('sisabulan').value=SisaBulan;
    document.getElementById('lastupdate').value=update;
	document.getElementById('method').value='update';
	if(tipesusut=='1'){
		var d = new Date();
		var n = d.getMonth();
		var i=1;
		var hrgawal=hargaperolehan;
		var date=new Date();
		datex=date.setMonth(date.getMonth() + 1);
		for(i=1;i<=jlhblnpenyusutan;i++){
			//xa=awalpenyusutan+i;	
		}
		var resultList = [];
		//var date = new Date("October 13, 2014");
		var date = new Date("2015-10");
		//var endDate = new Date("January 13, 2015");
		var endDate = new Date("2016-01");
		var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		while (date <= endDate)
		{
		    var stringDate = monthNameList[date.getMonth()] + " " + date.getFullYear();
		    resultList.push(stringDate);
		    date.setMonth(date.getMonth() + 1);
		    //document.getElementById('nilaipenyusut').value=resultList[0];
		    //document.getElementById('nilaipenyusut').value=n;
		}
		/*var myDate = new Date();
		for(var i =0;i<30; i++)
		{
		   myDate.setMonth(myDate.getMonth() + 1);
		   console.log(myDate);
		   alert(myDate);	
		}*/

		//return resultList;
		//alert(resultList.join('\n'));
		//var susutlinear=hargaperolehan/jlhblnpenyusutan;
		
		//document.getElementById('nilaipenyusut').value=datex;
	}
	
	document.getElementById('btnsimpan').disabled=false;        
//        param="&lokasi="+loc+'&method=update';
//        alert(param);
	tabAction(document.getElementById('tabFRM0'),0,'FRM',1);
//getLoc();	
}
function delAsset(kodeorg,kodeasset)
{
	    param="&kodeorg="+kodeorg+'&kodeasset='+kodeasset+'&method=delete';//deleting row
		tujuan = 'sdm_slave_save_daftarAsset.php';
		if(confirm('Deleting '+kodeasset+', Are you sure..?'))
		   post_response_text(tujuan, param, respog);			

		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('containeraset').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}


function cancelAsset()
{
        //document.getElementById('kodeaset').disabled=false;
	document.getElementById('kodeorg').disabled=false;
	document.getElementById('kodeorg').options[0].selected=true;
	document.getElementById('tipe').options[0].selected=true;
	document.getElementById('kodeaset').value='';
	document.getElementById('kodebarang').value='';
	document.getElementById('namaaset').value='';
	document.getElementById('tahunperolehan').value='';
	document.getElementById('status').options[0].selected=true;
	document.getElementById('nilaiperolehan').value='0';
	document.getElementById('jumlahbulan').value='1';
	document.getElementById('penambah').value='0';
	document.getElementById('pengurang').value='0';
	//document.getElementById('bulanawal').options[0].selected=true;
	document.getElementById('keterangan').value='';
	document.getElementById('method').value='insert';
	document.getElementById('tipesusut').options[0].selected=true;
	document.getElementById('btnsimpan').disabled=true;	
	document.getElementById('lokasi').options[0].selected=true;	
	document.getElementById('lokasi').disabled=false;
}
function cancelAsset2()
{
	window.location.reload();
}
function getLoc(org)
{
    kodeorg=document.getElementById('kodeorg').options[document.getElementById('kodeorg').selectedIndex].value;
    param='kodeorg='+kodeorg+'&method=getLoc';
    if (org!='')kodeorg=org;
//    alert(param);
    tujuan='sdm_slave_save_daftarAsset2.php';
    post_response_text(tujuan, param, respog);

            function respog(){
                    if (con.readyState == 4) {
                            if (con.status == 200) {
                                    busy_off();
                                    if (!isSaveResponse(con.responseText)) {
                                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                    }
                                    else {
                                                                                       
                                            if (org!='')
                                                document.getElementById('lokasi').value=kodeorg;
                                                document.getElementById('lokasi').innerHTML=con.responseText; 
                                            
                                    }
                            }
                            else {
                                    busy_off();
                                    error_catch(con.status);
                            }
                    }
            }
}


