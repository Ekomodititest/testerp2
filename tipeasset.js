/**
 * @author Developer
 */
function simpanTipeAset()
{
        kodetipe=document.getElementById('kodetipe').value;
        namatipe=document.getElementById('namatipe').value;
        namatipe1=document.getElementById('namatipe1').value;
        noakun=document.getElementById('noakun');;
        noakun=noakun.options[noakun.selectedIndex].value;
        noakunak=document.getElementById('noakunak');;
        noakunak=noakunak.options[noakunak.selectedIndex].value;  
        noakunaset=document.getElementById('noakunaset');;
		noakunaset=noakunaset.options[noakunaset.selectedIndex].value; 
        akumnoakun=document.getElementById('akumnoakun');;
        akumnoakun=akumnoakun.options[akumnoakun.selectedIndex].value; 		
        met=document.getElementById('method').value;
        if(kodetipe == ''){
			alert(document.getElementById('rkode').value + ' ' + document.getElementById('alertrequired').value);
		}
        else if(namatipe == ''){
			alert(document.getElementById('rnamakelompok').value + ' ' + document.getElementById('alertrequired').value);
		}
        else if(namatipe1 == ''){
			alert(document.getElementById('rnamakelompok1').value + ' ' + document.getElementById('alertrequired').value);
		}
        else if(noakunak == ''){
			alert(document.getElementById('raktivadalam').value + ' ' + document.getElementById('alertrequired').value);
		}
        else if(noakunaset == ''){
			alert(document.getElementById('rakunasset').value + ' ' + document.getElementById('alertrequired').value);
		}
		//sementara tidak dijadikan mandatory ==Jo 15-03-2017==
        /*else if(noakun == ''){
			alert(document.getElementById('rakundepresiasi').value + ' ' + document.getElementById('alertrequired').value);
		}
		else if(akumnoakun == ''){
			alert(document.getElementById('rakumdepresiasi').value + ' ' + document.getElementById('alertrequired').value);
		}*/		
        else{
                kodetipe=trim(kodetipe);
                namatipe=trim(namatipe);
                param='kodetipe='+kodetipe+'&namatipe='+namatipe+'&method='+met;
                param+='&noakun='+noakun+'&noakunak='+noakunak+'&namatipe1='+namatipe1+'&noakunaset='+noakunaset+'&akumnoakun='+akumnoakun;
                tujuan='sdm_slave_save_tipeasset.php';
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

function fillField(kode,nama,nama1,noakun,noakunak,noakunaset,akumnoakun)
{
        document.getElementById('kodetipe').value=kode;
        document.getElementById('kodetipe').disabled=true;
        document.getElementById('namatipe').value=nama;
        document.getElementById('namatipe1').value=nama1;
        document.getElementById('method').value='update';
        x=document.getElementById('noakun');
        for(a=0;a<x.length;a++)
        {
                if(x.options[a].value==noakun)
                {
                        x.options[a].selected=true;
                }
        }
        x=document.getElementById('noakunak');
        for(a=0;a<x.length;a++)
        {
                if(x.options[a].value==noakunak)
                {
                        x.options[a].selected=true;
                }
        }        
		
        x=document.getElementById('noakunaset');
        for(a=0;a<x.length;a++)
        {
                if(x.options[a].value==noakunaset)
                {
                        x.options[a].selected=true;
                }
        }		
		
		x=document.getElementById('akumnoakun');
        for(a=0;a<x.length;a++)
        {
                if(x.options[a].value==akumnoakun)
                {
                        x.options[a].selected=true;
                }
        }
}

function cancelTipeAsset(){
        document.getElementById('kodetipe').disabled=false;
        document.getElementById('kodetipe').value='';
        document.getElementById('namatipe').value='';
        document.getElementById('namatipe1').value='';
		document.getElementById('noakunak').value='';
		document.getElementById('noakunaset').value='';
        document.getElementById('method').value='insert';
        document.getElementById('noakun').options[0].selected=true;		
        document.getElementById('akumnoakun').options[0].selected=true;		
}
