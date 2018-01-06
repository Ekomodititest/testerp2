// JavaScript Document

function cancelForm()
{
        //document.getElementById('tglIzin').disabled=false;
        //document.getElementById('tglIzin').value='';
        document.getElementById('jam1').value=00;
         q=document.getElementById('jam1');
        for(a=0;a<q.length;a++)
        {
        if(q.options[a].value==00)
            {
                q.options[a].selected=true;
            }
        }
        q2=document.getElementById('mnt1');
        for(a2=0;a2<q2.length;a2++)
        {
        if(q2.options[a2].value==00)
            {
                q2.options[a2].selected=true;
            }
        }
         qjm2=document.getElementById('jam2');
        for(aqjm2=0;aqjm2<qjm2.length;aqjm2++)
        {
        if(qjm2.options[aqjm2].value==00)
            {
                qjm2.options[aqjm2].selected=true;
            }
        }
        qmnt2=document.getElementById('mnt2');
        for(aqmnt2=0;aqmnt2<qmnt2.length;aqmnt2++)
        {
        if(qmnt2.options[aqmnt2].value==00)
            {
                qmnt2.options[aqmnt2].selected=true;
            }
        }
        document.getElementById('jnsIjin').value='';
        document.getElementById('tglAwal').value='';
        document.getElementById('tglEnd').value='';
        document.getElementById('keperluan').value='';
        document.getElementById('ket').value='';
        document.getElementById('atsSblm').value='';
        document.getElementById('atasan').value='';
        document.getElementById('jumlahhk').value='0';
		document.getElementById('tahun1').checked=false;
		document.getElementById('tahun2').checked=false;
}



function saveForm()
{
		//atur warna default untuk textbox (putih)
		document.getElementById('karyawanid').style.backgroundColor = '#FFFFFF';
		document.getElementById('tglAwal').style.backgroundColor = '#FFFFFF';
		document.getElementById('tglEnd').style.backgroundColor = '#FFFFFF';
		document.getElementById('jnsIjin').style.backgroundColor = '#FFFFFF';
		document.getElementById('jam1').style.backgroundColor = '#FFFFFF';
		document.getElementById('mnt1').style.backgroundColor = '#FFFFFF';
		document.getElementById('jam2').style.backgroundColor = '#FFFFFF';
		document.getElementById('mnt2').style.backgroundColor = '#FFFFFF';
		document.getElementById('keperluan').style.backgroundColor = '#FFFFFF';
		document.getElementById('jumlahhk').style.backgroundColor = '#FFFFFF';
		document.getElementById('atasan').style.backgroundColor = '#FFFFFF';
		document.getElementById('hrd').style.backgroundColor = '#FFFFFF';
		
		karyawanid=document.getElementById('karyawanid').options[document.getElementById('karyawanid').selectedIndex].value;
		tahun1c=document.getElementById('tahun1').checked;
		tahun2c=document.getElementById('tahun2').checked;
		tahun1d=document.getElementById('tahun1').disabled;
		tahun2d=document.getElementById('tahun2').disabled;
		tahun1=document.getElementById('tahun1').value;
		tahun2=document.getElementById('tahun2').value;
		sisa1=document.getElementById('sisa1').value;
		sisa2=document.getElementById('sisa2').value;
		
        tglijin=document.getElementById('tglIzin').value;
        tglAwal=document.getElementById('tglAwal').value;
        tglEnd=document.getElementById('tglEnd').value;
        jnsIjin=document.getElementById('jnsIjin').options[document.getElementById('jnsIjin').selectedIndex].value;
        jam1=document.getElementById('jam1').options[document.getElementById('jam1').selectedIndex].value;
        mnt1=document.getElementById('mnt1').options[document.getElementById('mnt1').selectedIndex].value;
        jam2=document.getElementById('jam2').options[document.getElementById('jam2').selectedIndex].value;
        mnt2=document.getElementById('mnt2').options[document.getElementById('mnt2').selectedIndex].value;
        keperluan=document.getElementById('keperluan').value;
        ket=document.getElementById('ket').value;
        atasan=document.getElementById('atasan').options[document.getElementById('atasan').selectedIndex].value;
        jamDr=jam1+":"+mnt1;
        jamSmp=jam2+":"+mnt2;
        pros=document.getElementById('proses').value;
        hk=document.getElementById('jumlahhk').value;
        hrd=document.getElementById('hrd').options[document.getElementById('hrd').selectedIndex].value;
        //periodec=document.getElementById('periodec').options[document.getElementById('periodec').selectedIndex].value;
        param = "proses="+pros;
		dttdlkp = document.getElementById('dttdlkp').value;
		sisalalucukup = document.getElementById('sisalalucukup').value;
		sisacutitdkckp = document.getElementById('sisacutitdkckp').value;
		
		//untuk liat jenis izin/cuti/dayoff yg memotong jml hari atau tidak  ==JO 11-01-2016==
		isjml = document.getElementById('isjml').value;
		if (tahun2d==true){
			duaperiod=0;
		}
		else {
			duaperiod=1;
		}
		
		if (isjml==1){
			//cek jika ada data isian masih kosong, beri tanda di textbox dengan warna latar kuning ==JO==
			if (karyawanid==''){
				document.getElementById('karyawanid').style.backgroundColor = '#ADFF2F';
			}
			if (tglijin==''){
				document.getElementById('tglIzin').style.backgroundColor = '#ADFF2F';
			}
			if (tglAwal==''){
				document.getElementById('tglAwal').style.backgroundColor = '#ADFF2F';
			}
			if (tglEnd==''){
				document.getElementById('tglEnd').style.backgroundColor = '#ADFF2F';
			}
			if (jnsIjin==''){
				document.getElementById('jnsIjin').style.backgroundColor = '#ADFF2F';
			}
			if (jam1==''){
				document.getElementById('jam1').style.backgroundColor = '#ADFF2F';
			}
			if (mnt1==''){
				document.getElementById('mnt1').style.backgroundColor = '#ADFF2F';
			}		
			if (jam2==''){
				document.getElementById('jam2').style.backgroundColor = '#ADFF2F';
			}
			if (mnt2==''){
				document.getElementById('mnt2').style.backgroundColor = '#ADFF2F';
			}		
			if (keperluan==''){
				document.getElementById('keperluan').style.backgroundColor = '#ADFF2F';
			}
			if (hk=='0'){
				document.getElementById('jumlahhk').style.backgroundColor = '#ADFF2F';
			}
			if (atasan==''){
				document.getElementById('atasan').style.backgroundColor = '#ADFF2F';
			}				
			if (hrd==''){
				document.getElementById('hrd').style.backgroundColor = '#ADFF2F';
			}
			if (tglijin=='' || tglAwal=='' || tglEnd=='' || jnsIjin=='' || jam1=='' || mnt1=='' || jam2==''|| mnt2=='' || keperluan=='' || hk=='0' || atasan=='' || hrd=='' || (tahun1c==false && tahun2c==false)  ){
				alert(dttdlkp);
			}
			else {
				 if(pros=='update')
				{
					atsSblm=document.getElementById('atsSblm').value;
					param+="&atsSblm="+atsSblm;
				}
				param += "&karyawanid="+karyawanid;
				param += "&tglijin="+tglijin;
				param += "&jnsIjin="+jnsIjin;
				param += "&jamDr="+jamDr;
				param += "&jamSmp="+jamSmp;
				param += "&keperluan="+keperluan;
				param += "&ket="+ket;
				param += "&atasan="+atasan;
				param += "&tglAwal="+tglAwal;
				param += "&tglEnd="+tglEnd;
				param += "&jumlahhk="+hk;
				param += "&hrd="+hrd;
				param += "&duaperiod="+duaperiod;
				if (tahun1c==true){
					param += "&tahun1="+tahun1;		
				}
				if (tahun2c==true){
					param += "&tahun2="+tahun2;	
				}
				//param += "&periodec="+periodec;
				tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
				if (tahun1c==true && tahun2c==true){
					if (parseInt(hk)<=parseInt(sisa2)){
						alert(sisalalucukup);
					}
					
					else {
						 post_response_text(tujuan, param, respog);
					}
				}
				else if (tahun1c==true && tahun2c==false){
					
					if (parseInt(hk)>parseInt(sisa1)){
						alert(sisacutitdkckp);
					}
					else if (parseInt(sisa2)!=0 && tahun2d==false){
						alert(sisalalucukup);
					}
					else {
						 post_response_text(tujuan, param, respog);
					}
				}
				else if (tahun1c==false && tahun2c==true){
					if (parseInt(hk)>parseInt(sisa2)){
						alert(sisacutitdkckp);
					}
					else {
						 post_response_text(tujuan, param, respog);
					}
				}
				else {
					post_response_text(tujuan, param, respog);
				}
			}
		}
		else {
			if (karyawanid==''){
				document.getElementById('karyawanid').style.backgroundColor = '#ADFF2F';
			}
			if (tglijin==''){
				document.getElementById('tglIzin').style.backgroundColor = '#ADFF2F';
			}
			if (tglAwal==''){
				document.getElementById('tglAwal').style.backgroundColor = '#ADFF2F';
			}
			if (jnsIjin==''){
				document.getElementById('jnsIjin').style.backgroundColor = '#ADFF2F';
			}
			if (jam1==''){
				document.getElementById('jam1').style.backgroundColor = '#ADFF2F';
			}
			if (mnt1==''){
				document.getElementById('mnt1').style.backgroundColor = '#ADFF2F';
			}			
			if (keperluan==''){
				document.getElementById('keperluan').style.backgroundColor = '#ADFF2F';
			}
			if (atasan==''){
				document.getElementById('atasan').style.backgroundColor = '#ADFF2F';
			}				
			if (hrd==''){
				document.getElementById('hrd').style.backgroundColor = '#ADFF2F';
			}
			if (karyawanid=='' || tglijin=='' || tglAwal=='' ||  jnsIjin=='' || jam1=='' || mnt1=='' || keperluan=='' ||atasan=='' || hrd=='' ){
				alert(dttdlkp);
			}
			else {
				 if(pros=='update')
				{
					atsSblm=document.getElementById('atsSblm').value;
					param+="&atsSblm="+atsSblm;
				}
				param += "&karyawanid="+karyawanid;
				param += "&tglijin="+tglijin;
				param += "&jnsIjin="+jnsIjin;
				param += "&jamDr="+jamDr;
				param += "&jamSmp="+jamSmp;
				param += "&keperluan="+keperluan;
				param += "&ket="+ket;
				param += "&atasan="+atasan;
				param += "&tglAwal="+tglAwal;
				param += "&tglEnd="+tglEnd;
				param += "&jumlahhk="+hk;
				param += "&hrd="+hrd;
				param += "&duaperiod="+duaperiod;
				if (tahun1d==false){
					param += "&tahun1="+tahun1;		
				}
				if (tahun2d=false){
					param += "&tahun2="+tahun2;	
				}
				//param += "&periodec="+periodec;
				tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
				post_response_text(tujuan, param, respog);
			}
		}
		
			
		
        /*if(pros=='update')
        {
            atsSblm=document.getElementById('atsSblm').value;
            param+="&atsSblm="+atsSblm;
        }
        param += "&tglijin="+tglijin;
        param += "&jnsIjin="+jnsIjin;
        param += "&jamDr="+jamDr;
        param += "&jamSmp="+jamSmp;
        param += "&keperluan="+keperluan;
        param += "&ket="+ket;
        param += "&atasan="+atasan;
        param += "&tglAwal="+tglAwal;
        param += "&tglEnd="+tglEnd;
        param += "&jumlahhk="+hk;
        param += "&hrd="+hrd;
        //param += "&periodec="+periodec;
        if((jnsIjin=='CUTI' || jnsIjin=='MELAHIRKAN' || jnsIjin=='KAWIN/SUNATAN/WISUDA') && (hk=='0' || hk=='')){
            alert('Number of day(s) required');
        }else{
            tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
            //alert(param);
    //	return;
            post_response_text(tujuan, param, respog);
        }*/
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
                            //return;				
                            //document.getElementById('contain').innerHTML=con.responseText;
                            //cancelForm();
                            //loadNData();
							location.reload();
                    }
					//alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                        busy_off();
                        error_catch(con.status);
						alert('ERROR TRANSACTION,\n' + con.responseText);
                }
            }	
         } 	

}

function getJnIzin(){
	jnIzin=document.getElementById('jnsIjin').value;
	param='jnsIjin='+jnIzin+'&proses=getjnIzin';
	tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
	post_response_text(tujuan, param, respon);
	
	function respon() {
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
				} 
				else {
					// Success Response
					ar=con.responseText.split("###");
					if ((ar[0]== 1 && ar[1] == 0 && ar[2] == 0) || (ar[0]== 0 && ar[1] == 0 && ar[2] == 0)){
						document.getElementById('jumlahhk').disabled=true;
						document.getElementById('isjml').value=0;
					}
					else {
						document.getElementById('jumlahhk').disabled=false;
						if(ar[2] == 0){
							document.getElementById('isjml').value=1;
						}
						else if (ar[2] == 1){
							document.getElementById('isjml').value=0;
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

function getJmHak(){
	karyawanid=document.getElementById('karyawanid').options[document.getElementById('karyawanid').selectedIndex].value;
	sshak1= document.getElementById('sshak1').value;
	sshak2= document.getElementById('sshak2').value;
	txhari= document.getElementById('txhari').value;
	param='karyawanid='+karyawanid+'&proses=getJmHak';
	tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
	post_response_text(tujuan, param, respog);
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
						
						ar=con.responseText.split("###");
						document.getElementById('tahun1').value=ar[1];
						document.getElementById('year1').innerHTML=ar[1]+' ('+sshak1+' '+sshak2+': '+ar[3]+' '+txhari+')' ;
						document.getElementById('sisa1').value=ar[3];
						document.getElementById('tahun2').value=ar[2];
						document.getElementById('year2').innerHTML=ar[2]+' ('+sshak1+' '+sshak2+': '+ar[4]+' '+txhari+')';
						document.getElementById('sisa2').value=ar[4];
						document.getElementById('sis').innerHTML=ar[5]+' '+txhari;
						if (ar[6]==1){
							document.getElementById('tahun2').disabled=true;
						}
						else {
							document.getElementById('tahun2').disabled=false;
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


function loadNData()
{
        param='proses=loadData';
        tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
        //alert(tujuan);
        function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                                        //alert(con.responseText);
                                        document.getElementById('contain').innerHTML=con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
        post_response_text(tujuan, param, respon);
}
function cariBast(num)
{
                param='proses=loadData';
                param+='&page='+num;
                tujuan = 'sdm_slave_ijin_meninggalkan_kantor.php';
                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                document.getElementById('contain').innerHTML=con.responseText;
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	
}
function fillField(keprlan,karyawanid,tanggal,jnsijin,perstjan,statPrstjn,drjam,smpjam,hrd,hk,tahun1,tahun2) 
{

                param='proses=getKet'+'&tglijin='+tanggal+'&karyawanid='+karyawanid;
                tujuan = 'sdm_slave_ijin_meninggalkan_kantor.php';
                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                jm1=drjam.split(" ");
                                                tlgAwal=jm1[0].split("-");
                                                tglAwal1=tlgAwal[2]+"-"+tlgAwal[1]+"-"+tlgAwal[0];
                                                jmDari=jm1[1].split(":");


                                                jm2=smpjam.split(" ");
                                                tlgAkhir=jm2[0].split("-");
                                                tlgAkhir1=tlgAkhir[2]+"-"+tlgAkhir[1]+"-"+tlgAkhir[0];
                                                jamSmp=jm2[1].split(":");
                                                document.getElementById('tglIzin').disabled=true;
                                                document.getElementById('tglIzin').value=tanggal;
												kryid=document.getElementById('karyawanid');
												  for(a=0;a<kryid.length;a++)
												  {
														if(kryid.options[a].value==karyawanid)
															{
																kryid.options[a].selected=true;
															}
												   }
                                                document.getElementById('keperluan').value=keprlan;
                                                document.getElementById('proses').value='update';
                                                document.getElementById('tglAwal').value=tglAwal1;
                                                document.getElementById('tglEnd').value=tlgAkhir1;
                                                document.getElementById('jumlahhk').value=hk;
                                                 q=document.getElementById('jam1');
                                                  for(a=0;a<q.length;a++)
                                                  {
                                                        if(q.options[a].value==jmDari[0])
                                                            {
                                                                q.options[a].selected=true;
                                                            }
                                                   }
                                                   q2=document.getElementById('mnt1');
                                                  for(a2=0;a2<q2.length;a2++)
                                                  {
                                                        if(q2.options[a2].value==jmDari[1])
                                                            {
                                                                q2.options[a2].selected=true;
                                                            }
                                                   }

                                                   q3=document.getElementById('jam2');
                                                  for(a3=0;a3<q3.length;a3++)
                                                  {
                                                        if(q.options[a3].value==jamSmp[0])
                                                            {
                                                                q3.options[a3].selected=true;
                                                            }
                                                   }
                                                   qakr=document.getElementById('mnt2');
                                                  for(a5=0;a5<qakr.length;a5++)
                                                  {
                                                        if(qakr.options[a5].value==jamSmp[1])
                                                            {
                                                                qakr.options[a5].selected=true;
                                                            }
                                                   }
                                                   jns=document.getElementById('jnsIjin');
                                                  for(ajns=0;ajns<jns.length;ajns++)
                                                  {
                                                        if(jns.options[ajns].value==jnsijin)
                                                            {
                                                                jns.options[ajns].selected=true;
                                                            }
                                                   }
                                                   atsn=document.getElementById('atasan');
                                                  for(aatsn=0;aatsn<atsn.length;aatsn++)
                                                  {
                                                        if(atsn.options[aatsn].value==perstjan)
                                                            {
                                                                atsn.options[aatsn].selected=true;
                                                            }
                                                   }
                                                  x=document.getElementById('hrd');
                                                  for(j=0;j<x.length;j++)
                                                  {
                                                        if(x.options[j].value==hrd)
                                                            {
                                                                x.options[j].selected=true;
                                                            }
                                                   }   
                                                  /*x=document.getElementById('periodec');
                                                  for(j=0;j<x.length;j++)
                                                  {
                                                        if(x.options[j].value==periodec)
                                                            {
                                                                x.options[j].selected=true;
                                                            }
                                                   }*/
													if(tahun1!=0 && tahun1!=undefined  && tahun1!=null){
														document.getElementById('tahun1').checked=true;
													}
													else {
														document.getElementById('tahun1').checked=false;
													}
													if(tahun2!=0 && tahun2!=undefined && tahun2!=null){
														document.getElementById('tahun2').checked=true;
													}
													else {
														document.getElementById('tahun2').checked=false;
													}
                                                   document.getElementById('atsSblm').value='';
                                                   document.getElementById('atsSblm').value=perstjan;
                                                   document.getElementById('ket').value=con.responseText;
												   getJnIzin();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	
}
function cariTransaksi()
{
        txtSearch=document.getElementById('txtsearch').value;
        txtTgl=document.getElementById('tgl_cari').value;

        param='txtSearch='+txtSearch+'&txtTgl='+txtTgl+'&proses=cariTransaksi';
        //alert(param);
        tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
        post_response_text(tujuan, param, respog);			
        function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                document.getElementById('list_ganti').style.display='block';
                                                document.getElementById('headher').style.display='none';
                                                document.getElementById('detail_ganti').style.display='none';
                                                document.getElementById('contain').innerHTML=con.responseText;
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	
}
function dataKePDF(notrans,ev)
{
        noTrans	= notrans;
        tujuan='vhc_DetailPenggantianKomponen_pdf.php';
        judul= noTrans;		
        param='noTrans='+noTrans;
        //alert(param);
        printFile(param,tujuan,judul,ev)		
}
function printFile(param,tujuan,title,ev)
{
   tujuan=tujuan+"?"+param;  
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev); 	
}
function delData(tgl,karyawanid)
{
        tglijin=tgl;
        param='tglijin='+tglijin+'&karyawanid='+karyawanid+'&proses=deleteData';
        tujuan='sdm_slave_ijin_meninggalkan_kantor.php';
        if(confirm("Anda yakin ingin menghapus data ini?"))
        post_response_text(tujuan, param, respog);

        function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                        loadNData();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	



}

function loadSisaCuti(periode,karyawanid)
{
    param='periode='+periode+'&karyawanid='+karyawanid;
    tujuan='sdm_slave_ijin_getSisaCuti.php';
    post_response_text(tujuan, param, respog);
    function respog(){
            if (con.readyState == 4) {
                if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                                alert('ERROR TRANSACTION,\n' + con.responseText);
                        }
                        else {
                            document.getElementById('sis').innerHTML=con.responseText;
                        }
                }
                else {
                        busy_off();
                        error_catch(con.status);
                }
            }
       }    
}