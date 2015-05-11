(function() {
	//状态标志,1:显示wiki，2:显示transTxt
	var state = 2;
	var isShow = false;
	var imageurl = 'url("data:image/gif;base64,R0lGODlhGAAYAPf/AHvPYG7KUK7ind/z2FXBM6Lm+/X8/8rw/cztwpHWe1jDSljR+fD57MDu/b/nsun5/j7K+FXQ+UnN+VPEYnjOXVHP+VnCOEHFsV3S+nXNWkHI1GrITK7p/LrmrFjDRU7EdEHK8aLdkYnf+/n+/1bDUjPG7T3FvonUcsLptjnF0nvb+ynE+N32/jbI+ELL+V7EPtXwzfn9+WfHSDbG3lDEazLG8TTH+FTEXDzFxkbL6E3O+UHFq1nIgrrp12zX+jDG9mbV+jXG4vz+/IzVemjISu346ZzbiIXTbVzDPEvEilnDQWrW+uf24/z+/+76/8XqueH3/obd++r35oLRaOH024Hd+0fElEDK+WXGRdLvyff89nfZ+jvFydvy1LLq/EbM+ZbZg3DKUtLy/kbFnP7+/9v1/vL7/6jn/GTHRl3EPLHjojbG6DPG6uP13S7G+ETFoSzF+HPY+lfDTtn0/mzX81nEU1jCNjjI+JnahMjrvTvJ89b0/nHLVErEhr3t/T7I4jjF2e756n7QZFvS9ez6/vX785rj+E3FgFXGc7bkp0PHxmzJTrbr/fL68CXD+GTITbrs/WLU+kTM+WDFQPn9943Vdpnj/JTh+2nJUTnFz53k/K7iojzJ+DTH7lrERrfkqWbHR06+K3PMV1/T+oDRZ1/EP0vEgnfPc3TNYmLFQmnKWVnGY1vFWk/Ip3va977t+a/p+lLALyHC917LmFDGhDLG+FzDOzrJ+DHG+F7EPTvJ+GPGQzPH+DLH+Of4/mPGRC7F+MDosz3K+OT4/uX135/ci5/cjFrDPPv++oPSam7X+mHHWY3f++/57EjIs+z6/avo/ITd9p3j+Yne9mnQsETL94zWhR/B91zR6GLHUkvJvXHX9EjM8GfV9TbH9VXP74PScYbTeE3IqF7FSv7//mPJcUfGq2XKavL8/5zk+3HNa6vn7kTHu0fHsbHipLPkpVXKqGrJVq3o95zbjUjEkIjTb4vUc+/7/rnr/S/G+Oz46ovd3VvDOjDG+P///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgD/ACwAAAAAGAAYAAAI/wD/CRw4EIKkFjUA1SDIsOG/Xv364YrYz1u/Hw4Z6qLIsePCjLUi8orEYc69e3M4ROIVEWPDiRFdVDlgwJ8/AwequKDocuAtihj22Bw6dA8Gih8FRryy4AHRp/4eLKA4MGQ/ZhygQuWgi6VLimWaaH3aJMLGfv92RjQzFioGCBJbnO03rO3TBZwirmlBUVMDuzZZSOB7kXA/CUBGAI7C8ceXjlsItYUEl+IaSR37LTjjS+uSjor+Ze5no4KPJQVq+vPyk6NAq6P7RbFZJkLHnrH7jYLirwyQzAN9te6ow88IRlM9MoQZsdeVOGe23MnckyDsWhB0qL2d8d9ZXLpcDBJH2r1q7OrlBUJwYeNHkBLdAwIAIfkECQoA/wAsAAAAABgAGAAACP8A/wkcOBCCpBZsAF0QQ7Chw179+uHqVyNiPxMPHDbUZdFiRYtBJmgUWCsir0gc5ty7J0aELjj9ZtzQODGiiyoHDPjz5+RMhXz5LnpoeMsihj07k+584ANYRFO7CEa8suCB0qsPIjhNoWBgyX7MOFwdW6DXRBpIBFos02Ts1WFfeOV7w++fC4tm3GLVYSMfjrocIw7Tq9SXhL5B+C1qYVFTA8I7D0Dola8EPzSMI0oAMoIwORUw+1nG8qVjvy2E9DaAELRf4l+STPdbcMbX2Cqh+/0N8E92PxsVfCyBRc6fmC+56ZL0bdGQvxGgW/dDO5B5v1FWC7TIzXWgr6KydfhBMWBJWO5+pl40rBmx15U4Z7bJ7WjCk8av/WpB0OHio0WZI/0TGC66uHCLf66JFOByHlmE0YINQeCCDSXMsNBIAQEAIfkECQoA/wAsAAAAABgAGAAACP8A/wkcOBCCpBZBMtFqQrChw179+uHqVyMiFwUOHeqKyJEix0we0mQUWCsir0gc5tx7BikCnH47+NnKODGiiyoHDPjzN0cZrnw/aMhseIsjhj07k/prUmVFPhP8+O0iGPHKggdKlT6oAKfTjagDS/ZjxiFrVmYvk0zih0QgxzJNzCo90KKfNiJgXXA0I3cup3waAoDdGHFY36QH7vRbsyjqoroRNTU47M9Lr3wlsERFA7mfBCAjDitb0a9EVH5YvnTst4WQ3AOcgPULcvqXpNX9FpzxldWS036ZTgf4h7ufjQo+lrzydw8D6X4XTpMszlFe5V6y+/WJ2tYt9VH3fC1ReNmPzVd+A30Vxa3DD6E45PtB5feiYc2Iva7EOdMte7+gQzkkVj+1QKCDCxVxFNNMIxGGiy4u3JIgcAqINFJYHSV40YUZQeCCDWykcAhDGQUEACH5BAUKAP8ALAAAAAAYABgAAAj/AP8JHDgQgqQWMy6MI8iw4b9e/frh6leiXwoPSBwy1BWxI8WIF/jxS6PxX62IvCJxmHPvQRQ3+WjY4mfL4cSILqocMOCPTIEWwNiJpMnwVkcMe/wpXWppha5TQ3cRjHhlwYOlWAnpgLMOwNCBJ/sx44C1rIoVzIL9KsUv47+OZZqUxXoGjg8hFIiI/Oeio5m5WDnAieBPUIC9HCMOA7wUGpwv/gAsErmoRUdNDRj7u7QCAjE+WESisRxRApARgMlF6lxsKD8sXzz220Jo7p5bcECAcv1Lkux+C874wuplxY8/rvkFePvbRgUfSw74U+GoH47kAsP+jvjqngQ4/d64V3bLfPuoGAVW5Ot3yPVAX0Z/6/Cz5wt4NnKGvmB4M2KvK3GcMQh4/VxwjEg1NaRdLRDo4EJFEdGAYEmJ4aKLC7dAGNJIJYHlUUUXkddhQS7YEMQOCpQUEAAh+QQFCgD/ACwMAAAABgAYAAAIdQCt5Jr0r+AMObb4IflX4wO/h/wu7QuWLBe/M65gGNnAjwUQf/4GCEL3EWQRcspAqlShEuSWlv5etvTRcsSCloQkqMwz7IvKE690+kOxq4AOf1Qo8Euno82RhypyAIBY7ULChz/oQeTXcCsgOQ8XjrGVq+C/gAAh+QQFCgD/ACwMAAAAAwAYAAAIMABt5ZqUyha/g/waUXHgTwsMfxAjSpxIsSLERJT8GYPIxF8bZE8ACACFsCRCJAIDAgAh+QQFCgD/ACwKAAAAAgAYAAAIMQC/4Pg35l+ffyEQ/hPw79O/YP/yRJzo4J8ahQn+Pfqn4F+2f6j+nfqH6B8tgv9wBAQAIfkEBQoA/wAsBwAAAAUAGAAACHEA/wkUR0LgDn4e/gVRgPDfLALJmIBYZgdPjB4EMhTyl8hOon/+wIShAlLQCYH+AlRCicUeyl0ZmIAEZSEYyEUEpgjxx4qfBTX+aPjcFc4Uv6Me3hy1oCrTUQJgatywYGvePyv8SqlSqOBFNoMNB5IICAAh+QQFCgD/ACwEAAAACAAYAAAImQD/CfwnxNkEBQPX0ODHT8k/XSUWMlRSq18ffnYo5GHQD8cxfrYqUfHX7wNGPEL8+dPgCQkFBir9UbPDJxi5mGBiHbkZU1CsSjFVYopVL6i/cQQyIAjqid+LZJRiymFoR0DMCQwtvBBQyJ8phgzTABiyAyxYJSkUmLWDqiRYC2ncdfzIkM+mihdBboj3MCJIUI8SSnQ4sODBgAAh+QQJCgD/ACwBAAAACwAYAAAIogD/CRz4rwutOh4I/gv0gZ9CgRpIOHwISKIFNCG6NBJYoqHDDB02CrzAj5+FE0X8DWQzgV8qAIFUDuTCj0AlFORkCrTCL9QnfzoF0uj5JKhAiaEcGP3ngV8sMFnIKWxqAdQRSkElTixGieDQibYqwRCysyRBIvUE0pz4kKXZgRYAjHwrkEgwjh4FlpryaWDFiZPCYCIY0WGpDQ8Zsn1Y8KCHgAAh+QQFCgD/ACwAAAAAGAAYAAAIuQD/CRw4EAmSSQQTKiSYhp8tAPwWShSIhJ/FixMXVuSXK5kDKo0yJrR1cYMRGFr8iRxY6qKgAf5iqlz5D0maMAACyYxJcyOKYDt5rrzYRkjQmRkv8it0FOnEDRksSmm6Mgwfi2oQHF25kV+AI8iCrmyoNAGDnSt3KbUIoEMRoSLXWnyRwd6JnnKV0vyX1yKpvbnyikKw9x/Ji2mIJOhQuOZFJDL4bGj8L7BDLBt2Uaaod7PAXEhyrQwIACH5BAkKAP8ALAwAAAAMABgAAAizABWwotXln8GDBpXwM/ghEMKECOVoePivSwg0Fv6RAPSwUYcMC/99KEGxyImM/y7cKkkh4wQ2FP+9S2OLH5daFKUsSmPBSr+SfF7wo4GrxcMiYV5YINHPxUMYoJDw89DPBkJyYOwYpGr1IAIZIZl+QYgH5T8a/ZYEI1cxgFmf/zb9iwHG7L+b//T9SzRJq8GXBrUIQOPXoEqDQ5A8HHlQycONCB0fJDEx8sGGFD3UIRjzX0AAIfkECQoA/wAsAAAAABgAGAAACNsA/wkcSFAgiVXthBRcyFCgEn78aKxpSNEhRH4T2NyqyJBBHgoW+PXph4tjQX9UKtnidwwHSZMD/fkTgscOvw/9+m2EKdMfA1F2PKXICfNfT38hQprj1a8Wz55ZJvHjoYuoyaMwsPBbBYFki6s9YeziV4dTThdgZQZLw89Ti5w20vqrRICfh5z94nIM+yukHLxf0gqoixHvEpMI/DUSRNgUXpPHgvlDkSYkvx05nZpspA+ATbtD+xVlUOnzzZw7TYKzzNJlyaIPL458DftixtS1I04sSlABQoUMAwIAIfkEBQoA/wAsAAAAABgAGAAACP8A/wkcOBCJrUk34N0iyLDhvzT8bAHg54GfuX61HDJEwq+jx4oegvTrt1AjR365kjmg0ohJMgKzeI3E5dCWxw1GYGjxFwOPnWUgRvajSbCUR0ED/ClVWigDgR4YhJYUiCRNGACBlmpVEyvRgwVCC3ZEEUyrVhhp8PjjoEtmxn8e2wgxu7TZhin+mkTQNRKux0J0lzYKIEopBghDW2zI0FFKYKWNFhFRuoDTSBdh+HRUg+AxMTRo/LGQ0GKkjZP8AhxBFjgPAVD+ogjtZwOiR34JGNA1EmsRJMRCv+y63RFAhyJaSRHIsGR2vyV+ib/IYO8ElUAy7Ki75Zwq8dvHuiBdsMOPh/O30b+T0pKAAL833Qfm+s5PFIIspSzwyzR7qkCbHqVBRAIdoELeDTUIRdRGHiEhAx8bVMSPFQpq9M98EWGxwS4VKTDDSP6ZdFtFO2BkoUO5IJELCa0IY2FAACH5BAUKAP8ALAoAAAAHABgAAAhuAJH8U1Thn0GDY/rdOfivT7+HB0PM4RApooEDVVwYFOCv4x6Dn/519Gewg8iOBoOdJPlP5UiDDlaWlPlPDU0BNEPQBGOgoxeDQzqWiQDUXxkg/QzaY7QA4r9zdx4m/fdB6kGHTv8lnGoQx5eDAQEAIfkEBQoA/wAsCwAAAAIAGAAACCMA/93614/gv3v//CVcqLAhw4cKC/CL8g/KvxH/thgsWNBGQAAh+QQFCgD/ACwKAAAAAgAYAAAINgD5Ifpn5d+Of9P+ifhn6V+Bf7D+QZL4D98/Dv80/WP2L84/EP/Y/Pvz79s/bP8U/WtH8B+NgAAh+QQFCgD/ACwGAAAABgAYAAAIfgD/CfyXZMbAJP1KCJTDJqFAeHAiQbEQLwccFSP+9VhRwYy/ZgXgFPjn758KCXNI/sOwRGBJCXFc/uPkQ+adClBUQgDGQWW1FaOalPyTD46mklz6ublF59+FflAV0oMKh9u/CVBXuPqnBFA+XNEEjslnw+o/hjZADOzj8OCMgAAh+QQFCgD/ACwDAAAACQAYAAAIoQD/CRTY5FAKNgP/KeDS71+NgR4YNnwocEc/OBEgPRNI40c+XMrm+BNoIt+KKk1G/ivXCVcEQir/7VshgQM5lXa2OQKScqCtQY6U+Yv5r5qjJUMTeltRocHNgSXy2QBiIGaQfvngWEr6L1O/fsBaXDIj8MJXrL0WCOxzduDDGyW+DvxGUq6bWtI4/pCrw9BAi/1wuUgYMTCEhAoZOkRc8GBAACH5BAkKAP8ALAIAAAAKABgAAAioAP8JHCjmwowSA/89MNEvocAbMxo6hNgPji4RYu7988Aw378KZ5wINNWvHzAfD/wJVJAp350FKQfS6LdCmRdyKgW+6SergL+cAnH0u8YIqMAgPKEZ/VeinyMVDX4ObArsChADQJFKjDJiIJeS//LhUnagyb+dEgVa/TczbUIFKcAOBDboH8m0cK7A+ueJYcN8NiIVeBgx7B0J1QZSBOxCT8KFbh0WPBgQACH5BAXIAP8ALAAAAAAYABgAAAi5AP8JHDgQgqQWBBMqJNirXz9c/RZKFKjLocWIExXWcsgrEoc59zImhOjQRZUDBvyJHHjLIoY9/mKqXPnP4ZUFD2TGpLmxHzMOOneutFimSdCZGV1YNHMU6cSKDoc1XdnCoqYGR6lalABkRNCVXy7220JI50pJYvstOONLqMi0/WxU8LGEJ1yLNGveHUXTV8u0Ovzk/UfSYa8rcc4M/tezXy0IOlws/gcVly4XtyYLbIxR8z8ILmysDAgAOw==")';
	var wikiurl = '';
	
	//判断脚本是否在frame中执行
	if (window != top || (self.frameElement && self.frameElement.tagName == 'IFRAME')) {
		//alert('scroll');
		$('html,body').scrollTop(80);
		return;
	}
	console.log('selector:add content js to page');
	//获取选择文本内容
	function getSelecctTxt() {
		var selText;
		if (document.activeElement &&
            (document.activeElement.tagName.toLowerCase() == "textarea" ||
                document.activeElement.tagName.toLowerCase() == "input")) {
            var text = document.activeElement.value;
            selText = text.substring(document.activeElement.selectionStart,
                document.activeElement.selectionEnd);
        } else {
            var selRange = window.getSelection();
            selText = selRange.toString();
        }
		return selText;
	}

	//添加悬浮按钮与相应CSS
	function showAddBtn() {
		$('body').append('<a id="my-add-btn" name="my-add-btn" href="javascript:void(0)"></a>');
		$('#my-add-btn').css({
			display: 'none',
			height: '18px',
			width: '18px',
			position: 'fixed',
			zIndex: '2147483647',
			lineHeight: '18px',
			textDecoration: 'none',
			font: 'bold 12px/25px Arial, sans-serif',
			color: 'rgba(62, 87, 6, 0.53)',
			background: '-moz-linear-gradient(center top , rgba(165, 205, 78, 1) 0%, rgba(107, 143, 26, 1) 100%)',
			backgroundImage: imageurl,
			backgroundSize: '18px 18px',
			opacity: '0.55',
			textShadow: '1px 1px 1px rgba(255,255,255, .22)',
			borderRadius: '18px',
			boxShadow: '1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44)',
			transition: 'all 0.15s ease'
		});
		$('#my-add-btn').hover(function() {
			$(this).css({
				color: 'rgba(62, 87, 6, 1)',
				opacity: '1'
			});
		}, function() {
			$(this).css({
				color: 'rgba(62, 87, 6, 0.53)',
				opacity: '0.55'
			});
		});
		//如果点击在按钮上，阻止mouseup事件传播

		$('#my-add-btn').mouseup(function(e) {
			return false
		});
		//添加隐藏的加载显示按钮
		$('body').append('<div id="add-loading-img" style="display:none;height: 24px;width: 24px;position: fixed;bottom:20px;right:20px;zIndex: 2147483647;;border-radius: 24px;"></div>');
		$('#add-loading-img').css({
			'background': imageurl,
			'box-shadow': '1px 1px 1px rgba(0, 0, 0, 0.29), 1px 1px 1px rgba(255, 255, 255, 0.24) inset'
		});

	}

	/**************弹出框***************/
	function showPanel() {
		$('body').append('<div id="content-div"><div id="top-div"><a href="javascript:void(0)" id="wiki-tab">WIKI</a><a href="javascript:void(0)" id="translator-tab">	TRANSLATOR</a></div><div id="frame-div" style=""><div id="trans-div" style="display:none;width:300px;height:auto;background:rgba(233, 233, 233, 1);opacity:.8;padding:10px;max-height:190px;overflow:auto;">blabla</div><iframe id="wikiframe" name="wikiframe" src="#" ></iframe></div></div>');
		$('#content-div').css({
			opacity: '0',
			display: 'none',
			width: '320px',
			position: 'fixed',
			right: '20px',
			bottom: '-190px',
			zIndex: '2147483647',
			font: 'bold 12px/25px Arial, sans-serif',
			background: 'transparent'
		});
		$('#top-div').css({
			height: '40px',
			width: '320px',
			background: 'rgba(0,0,0,.05)',
			borderRadius: '20px 20px 0px 0px',
			lineHeight: '40px',
			textAlign: 'center'
		});
		$('#wiki-tab').css({
			width: '160px',
			color: 'rgba(255, 255, 255, .88)',
			textDecoration: 'none',
			background: 'rgba(0,152,249,.6)',
			float: 'left',
			fontSize: '1em',
			borderRadius: '20px 20px 0px 0px'
		});
		$('#translator-tab').css({
			width: '160px',
			color: 'rgba(0, 0, 0, 0.25)',
			textDecoration: 'none',
			background: 'transparent',
			fontSize: '1em',
			float: 'left',
			borderRadius: '20px 20px 0px 0px'
		});
		$('#frame-div').css({
			boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.33)',
			textAlign: 'left'
		});
		$('#wikiframe').css({
			width: '320px',
			height: '210px',
			opacity: '0.85',
			border: '0px'
		});


		if (state == 2) {
			wikiTabToTrans();
		}

		//屏蔽content-div上的mouseup消息
		$('#content-div').mouseup(function() {
			return false
		});
		//点击事件
		$('#wiki-tab').click(function() {
			if(state==2)
				transBtnToWiki();
			return false;
		});
		$('#translator-tab').click(function() {
			if(state==1)
				wikiTabToTrans();
			return false;
		});
	}
	//tab切换函数，同时对state状态设置

	function transBtnToWiki() {
		state = 1;
		if(wikiurl!=''){
			$('#wikiframe').attr('src', wikiurl);
			wikiurl= '';
		}
		$('#translator-tab').css({
			color: 'rgba(0, 0, 0, 0.25)',
			background: 'transparent'
		});
		$('#wiki-tab').css({
			color: 'rgba(255, 255, 255, .88)',
			background: 'rgba(0,152,249,.6)'
		});
		$('#trans-div,#wikiframe').toggle();
	}

	function wikiTabToTrans() {
		state = 2;
		$('#wiki-tab').css({
			color: 'rgba(0, 0, 0, 0.25)',
			background: 'transparent'
		});
		$('#translator-tab').css({
			color: 'rgba(255, 255, 255, .88)',
			background: 'rgba(56, 189, 15, 0.6)'
		});
		$('#trans-div,#wikiframe').toggle();
	}

	showAddBtn();
	//绑定点击按钮事件
	$('#my-add-btn').click(function(e) {
		$('#my-add-btn').css({
			display: 'none'
		});
		//向add-on script发送消息
		self.port.emit("text-selected", getSelecctTxt());
		$('#wikiframe').css('height', '0px');
		$('#add-loading-img').show();
		console.log("selecttext:" + getSelecctTxt());
		//alert(getSelecctTxt());
		return false;
	});
	showPanel();
	//加载完成后改变frame高度
	$('#wikiframe').load(function() {
		$('#wikiframe').css('height', '210px');
		$('#wikiframe html,#wikiframe body').scrollTop(80);
		//console.log('frame load complete!');
	});
	//绑定鼠标抬起事件

	$('body').mouseup(setHandler);
	//判断是否选取文字,处理鼠标抬起事件，显示按钮
	function setHandler(ev) {
			if($(ev.target).is('#my-add-btn')){
				$('#my-add-btn').hide();
				//向add-on script发送消息
				self.port.emit("text-selected", getSelecctTxt());
				$('#wikiframe').css('height', '0px');
				$('#add-loading-img').show();
				console.log("selecttext:" + getSelecctTxt());
				return false;
			}
			ev = ev || window.event;
			
			if (getSelecctTxt() == '' || ev.which != 1) {
				isShow = false;
				return;
			}
			
			$('#my-add-btn').css({
				top: ev.clientY + 9,
				left: ev.clientX + 9,
				display: 'block',
				lineHeight: '18px'
			});
			//alert(getSelectTxt());
		}
	
	//隐藏panel
	$('body').mousedown(function(e) {
		if($(e.target).is('#my-add-btn')){
			return false;
		}
		if(!($(e.target).is('#my-add-btn'))&&!($('#my-add-btn').is(":hidden"))){
			$('#my-add-btn').hide();
		}
		if(!($(e.target).is('#add-loading-img'))&&!($('#add-loading-img').is(":hidden"))){
			$('#add-loading-img').hide();
		}
		if (isShow) {
			if (!($(e.target).is('#content-div') || $(e.target).parents('#content-div').length > 0)) 
			{
				//$('#content-div').hide();
				$('#content-div').animate({bottom:'-230px',opacity:'0.0'},800,function () {
					$('#content-div').hide();
				});
				isShow = false;
			}
		}
	});

	//监听add-ons script消息
	self.port.on("get-transtext", function(textInfo) {
		if(state == 1){
			$('#wikiframe').attr('src', textInfo[0]);
			wikiurl = '';
		}else{
			wikiurl = textInfo[0];
		}
		
		//alert(textInfo[1]);
		isShow = true;
		$('#add-loading-img').hide();
		$('#content-div').show();
		$('#content-div').animate({bottom:'20px',opacity:'1.0'},800);
		$('#trans-div').html(textInfo[1]);
	});
})();