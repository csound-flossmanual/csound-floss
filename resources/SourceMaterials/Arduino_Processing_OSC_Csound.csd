Arduino_Processing_OSC_Csound.csd
Written by Iain McCurdy 2011

<CsoundSynthesizer>

<CsOptions>
-o dac -dm0
</CsOptions>
                                                       
<CsInstruments>

sr = 44100
ksmps = 8
nchnls = 1
0dbfs = 1

;FLTK INTERFACE CODE;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
FLcolor	255, 255, 255,  0, 0, 0
;		LABEL          | WIDTH | HEIGHT | X | Y
	FLpanel	"Arduino OSC",    500,    400,    0,  0
                                              
#define	ANALOG_OUTPUT(N)
#
;VALUE DISPLAY BOXES	LABEL | WIDTH | HEIGHT | X | Y
idana$N		FLvalue	"",      60,      17,    5,  iy+20                               
;SLIDERS				            	MIN |  MAX | EXP | TYPE |  DISP   | WIDTH | HEIGHT | X  | Y
gk, gihana$N		FLslider 	"Analog $N",	0,    1024,   0,     1,   idana$N,   490,     20,    5,   iy
FLsetColor2	rnd(255),rnd(255),rnd(255),gihana$N
iy	=	iy+40
#
iy	=	0
$ANALOG_OUTPUT(0)
$ANALOG_OUTPUT(1)
$ANALOG_OUTPUT(2)
$ANALOG_OUTPUT(3)
$ANALOG_OUTPUT(4)
$ANALOG_OUTPUT(5)

#define	DIGITAL_OUTPUT(N)
#
;VALUE DISPLAY BOXES	LABEL | WIDTH | HEIGHT | X | Y
iddig$N		FLvalue	"",      41,      17,   ix, iy+37                               
;SLIDERS				            	MIN | MAX | EXP | TYPE | DISP   | WIDTH | HEIGHT | X  | Y
gk, gihdig$N		FLslider 	"Dig. $N",	0,     1,    0,     1,  iddig$N,   41,      20,   ix,  iy
FLsetColor2	rnd(255),rnd(255),rnd(255),gihdig$N
ix	=	ix+41
#
ix	=	2
iy	=	250
;FLlabel isize, ifont, ialign, ired, igreen, iblue
FLlabel    11,    0,     0,    0, 0, 0
$DIGITAL_OUTPUT(2)
$DIGITAL_OUTPUT(3)
$DIGITAL_OUTPUT(4)
$DIGITAL_OUTPUT(5)
$DIGITAL_OUTPUT(6)
$DIGITAL_OUTPUT(7)
$DIGITAL_OUTPUT(8)
$DIGITAL_OUTPUT(9)
$DIGITAL_OUTPUT(10)
$DIGITAL_OUTPUT(11)
$DIGITAL_OUTPUT(12)
$DIGITAL_OUTPUT(13)
iy	=	iy+70
ix	=	40

#define ANA_SWITCH(N)
#
;SWITCHES                       		ON | OFF | TYPE | WIDTH | HEIGHT |     X     | Y | OPCODE | INS | STARTTIM | IDUR | p4
gkAnaOnOff,ih		FLbutton	"$N",	1,    0,     3,     25,     25,   80+($N*25),320,    0,      4,       0,       0,   $N
#
$ANA_SWITCH(0)
$ANA_SWITCH(1)
$ANA_SWITCH(2)
$ANA_SWITCH(3)
$ANA_SWITCH(4)
$ANA_SWITCH(5)
;TEXT BOXES						ITYPE, IFONT, ISIZE, IWIDTH, IHEIGHT, IX, IY
ih		 	FLbox  	"Analog On/Off",	1,       1,    12,     80,     25,      0, 320
ih		 	FLbox  	"Digital On/Off",	1,       1,    12,     80,     25,      0, 345
#define DIG_SWITCH(N)
#
;SWITCHES                       		ON | OFF | TYPE | WIDTH | HEIGHT |     X     | Y | OPCODE | INS | STARTTIM | IDUR | p4
gkDigOnOff,ih		FLbutton	"$N",	1,    0,     3,     25,     25,   80+($N*25),345,    0,      5,       0,       0,   $N     
#
$DIG_SWITCH(0)
$DIG_SWITCH(1)
$DIG_SWITCH(2)
$DIG_SWITCH(3)
$DIG_SWITCH(4)
$DIG_SWITCH(5)
$DIG_SWITCH(6)
$DIG_SWITCH(7)
$DIG_SWITCH(8)
$DIG_SWITCH(9)
$DIG_SWITCH(10)
$DIG_SWITCH(11)
$DIG_SWITCH(12)
$DIG_SWITCH(13)

			FLpanel_end

;INSTRUCTIONS AND INFO PANEL                 WIDTH | HEIGHT | X | Y
				FLpanel	" ", 515,     560,   512, 0
				FLscroll     515,     560,   0,   0
;TEXT BOXES												TYPE | FONT | SIZE | WIDTH | HEIGHT | X | Y
ih		 	FLbox  	"                        Arduino OSC                          ", 	1,      5,     14,    490,    20,     5,   0
ih		 	FLbox  	"-------------------------------------------------------------", 	1,      5,     14,    490,    20,     5,  20
ih		 	FLbox  	"This example displays Arduino sensor input data received via ", 	1,      5,     14,    490,    20,     5,  40
ih		 	FLbox  	"OSC through 'Processing' (http://processing.org/).           ", 	1,      5,     14,    490,    20,     5,  60
ih		 	FLbox  	"The Arduino board suggested for use with this example is an  ", 	1,      5,     14,    490,    20,     5,  80
ih		 	FLbox  	"Uno (formerly known as a Diecimilia). The example could      ", 	1,      5,     14,    490,    20,     5, 100
ih		 	FLbox  	"easily be modified for use with other boards.                ", 	1,      5,     14,    490,    20,     5, 120 
ih		 	FLbox  	"You will need to ensure that the Arduino library for         ", 	1,      5,     14,    490,    20,     5, 140 
ih		 	FLbox  	"Processing:                                                  ", 	1,      5,     14,    490,    20,     5, 160 
ih		 	FLbox  	"http://www.arduino.cc/playground/Interfacing/Processing      ", 	1,      5,     14,    490,    20,     5, 180 
ih		 	FLbox  	"and the oscP5 library:                                       ", 	1,      5,     14,    490,    20,     5, 200 
ih		 	FLbox  	"http://www.sojamo.de/libraries/oscP5/                        ", 	1,      5,     14,    490,    20,     5, 220 
ih		 	FLbox  	"are present.                                                 ", 	1,      5,     14,    490,    20,     5, 240 
ih		 	FLbox  	"Run the Processing sketch included on my website simultaneous", 	1,      5,     14,    490,    20,     5, 260 
ih		 	FLbox  	"with this csd. You will also need to ensure that the correct ", 	1,      5,     14,    490,    20,     5, 280
ih		 	FLbox  	"serial device number has been selected in the Processing     ", 	1,      5,     14,    490,    20,     5, 300
ih		 	FLbox  	"sketch. By default device 'zero' is selected.                ", 	1,      5,     14,    490,    20,     5, 320
ih		 	FLbox  	"The Arduino should be programmed with a Standard Firmata     ", 	1,      5,     14,    490,    20,     5, 340
ih		 	FLbox  	"sketch. All pins (both analog and digital) will be set as    ", 	1,      5,     14,    490,    20,     5, 360
ih		 	FLbox  	"inputs by the Processing sketch. Unused inputs that are not  ", 	1,      5,     14,    490,    20,     5, 380
ih		 	FLbox  	"connected to ground may pick up interference and output      ", 	1,      5,     14,    490,    20,     5, 400
ih		 	FLbox  	"random values - if you are unclear about this you should     ", 	1,      5,     14,    490,    20,     5, 420
ih		 	FLbox  	"first explore some of the basic Arduino examples on their    ", 	1,      5,     14,    490,    20,     5, 440           
ih		 	FLbox  	"website.                                                     ", 	1,      5,     14,    490,    20,     5, 440
ih		 	FLbox  	"Analog inputs are represented as 8-bit integers (range 0 -   ", 	1,      5,     14,    490,    20,     5, 460
ih		 	FLbox  	"1023) and digital input values will be either a zero or a 1. ", 	1,      5,     14,    490,    20,     5, 480
ih		 	FLbox  	"This example produces no sound. It is suggested to disable or", 	1,      5,     14,    490,    20,     5, 500
ih		 	FLbox  	"quantize displaying of OSC data as FLTK or to the terminal in", 	1,      5,     14,    490,    20,     5, 520
ih		 	FLbox  	"a realtime performance.                                      ", 	1,      5,     14,    490,    20,     5, 540
ih		 	FLbox  	"The Processing sketch used is largely the work of Liam Lacey ", 	1,      5,     14,    490,    20,     5, 560
ih		 	FLbox  	"(http://liamtmlacey.tumblr.com).                             ", 	1,      5,     14,    490,    20,     5, 580
ih		 	FLbox  	"Inputs can be turned 'on' or 'off' using the on-screen       ", 	1,      5,     14,    490,    20,     5, 600
ih		 	FLbox  	"buttons in order to control the stream of data received and  ", 	1,      5,     14,    490,    20,     5, 620
ih		 	FLbox  	"printed and displayed.                                       ", 	1,      5,     14,    490,    20,     5, 640
				FLscroll_end
				FLpanel_end

				FLrun	;RUN THE FLTK WIDGET THREAD
;END OF FLTK INTERFACE CODE;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;HANDLE USED TO REFERENCE OSC STREAM
gihandle OSCinit 12001

;TABLES USED TO STORE ON/OFF STATUS FOR EACH ANALOG OR DIGITAL INPUT 
giAnaOnOffs	ftgen	0,0,8,-2,0
giDigOnOffs	ftgen	0,0,16,-2,0

instr   1	;READ OSC DATA
#define	READ_ANALOG_OSC(N)						;DEFINE A MACRO FOR INPUT OF ANALOG SENSOR DATA VIA OSC
	#
	gkAnaOnOff$N	table	$N,giAnaOnOffs				;READ ON/OFF STATUS FOR THIS INPUT
	if gkAnaOnOff$N==1 then						;IF THIS INPUT IN 'ON'
	 gkana$N init 0							;INITIALISE ANALOG VARIABLE
	 gktrigana$N  OSClisten gihandle, "/analog/$N", "i", gkana$N	;READ IN OSC VARIABLE
	endif
	#
	$READ_ANALOG_OSC(0)						;EXPAND MACRO, ONCE FOR EACH ANALOG INPUT
	$READ_ANALOG_OSC(1)
	$READ_ANALOG_OSC(2)
	$READ_ANALOG_OSC(3)
	$READ_ANALOG_OSC(4)
	$READ_ANALOG_OSC(5)

#define	READ_DIGITAL_OSC(N)						;DEFINE A MACRO FOR INPUT OF DIGITAL SENSOR DATA VIA OSC
	#
	gkDigOnOff$N	table	$N,giAnaOnOffs				;READ ON/OFF STATUS FOR THIS INPUT
	if gkDigOnOff$N==1 then		                                ;IF THIS INPUT IN 'ON'            
	 gkdig$N init 0							;INITIALISE ANALOG VARIABLE
	 gktrigdig$N  OSClisten gihandle, "/digital/$N", "i", gkdig$N	;READ IN OSC VARIABLE
	endif
	#
	$READ_DIGITAL_OSC(2)
	$READ_DIGITAL_OSC(3)
	$READ_DIGITAL_OSC(4)
	$READ_DIGITAL_OSC(5)
	$READ_DIGITAL_OSC(6)
	$READ_DIGITAL_OSC(7)
	$READ_DIGITAL_OSC(8)
	$READ_DIGITAL_OSC(9)
	$READ_DIGITAL_OSC(10)
	$READ_DIGITAL_OSC(11)
	$READ_DIGITAL_OSC(12)
	$READ_DIGITAL_OSC(13)
endin

instr	2	;PRINT TO TERMINAL
#define PRINT_ANALOG(N)
	#              
	if gkAnaOnOff$N==1 then				;IF THIS INPUT IN 'ON'...
	 printf "analog $N: %d\n", gkana$N+1, gkana$N	;PRINT TO TERMINAL
	endif
	#
	$PRINT_ANALOG(0)
	$PRINT_ANALOG(1)
	$PRINT_ANALOG(2)
	$PRINT_ANALOG(3)
	$PRINT_ANALOG(4)
	$PRINT_ANALOG(5)
	
#define PRINT_DIGITAL(N)
	#              
	if gkDigOnOff$N==1 then				;IF THIS INPUT IN 'ON'...
	 printf "digital $N: %d\n", gkdig$N+1, gkdig$N  ;PRINT TO TERMINAL       
	endif
	#
	$PRINT_DIGITAL(2)
	$PRINT_DIGITAL(3)
	$PRINT_DIGITAL(4)
	$PRINT_DIGITAL(5)
	$PRINT_DIGITAL(6)
	$PRINT_DIGITAL(7)
	$PRINT_DIGITAL(8)
	$PRINT_DIGITAL(9)
	$PRINT_DIGITAL(10)
	$PRINT_DIGITAL(11)
	$PRINT_DIGITAL(12)
	$PRINT_DIGITAL(13)
endin


instr	3	;DISPLAY USING FLTK WIDGETS
#define	OUTPUT_ANALOG_AS_FLTK(N)
	#
	if gkAnaOnOff$N==1 then		
	 FLsetVal	gktrigana$N,gkana$N,gihana$N
	endif
	#
	$OUTPUT_ANALOG_AS_FLTK(0)
	$OUTPUT_ANALOG_AS_FLTK(1)
	$OUTPUT_ANALOG_AS_FLTK(2)
	$OUTPUT_ANALOG_AS_FLTK(3)
	$OUTPUT_ANALOG_AS_FLTK(4)
	$OUTPUT_ANALOG_AS_FLTK(5)
#define	OUTPUT_DIGITAL_AS_FLTK(N)
	#
	if gkDigOnOff$N==1 then		
	 FLsetVal	gktrigdig$N,gkdig$N,gihdig$N
	endif
	#
	$OUTPUT_DIGITAL_AS_FLTK(2)
	$OUTPUT_DIGITAL_AS_FLTK(3)
	$OUTPUT_DIGITAL_AS_FLTK(4)
	$OUTPUT_DIGITAL_AS_FLTK(5)
	$OUTPUT_DIGITAL_AS_FLTK(6)
	$OUTPUT_DIGITAL_AS_FLTK(7)
	$OUTPUT_DIGITAL_AS_FLTK(8)
	$OUTPUT_DIGITAL_AS_FLTK(9)
	$OUTPUT_DIGITAL_AS_FLTK(10)
	$OUTPUT_DIGITAL_AS_FLTK(11)
	$OUTPUT_DIGITAL_AS_FLTK(12)
	$OUTPUT_DIGITAL_AS_FLTK(13)
endin

instr	4	;WRITE TO ANALOG ON/OFFS TABLE
	tableiw i(gkAnaOnOff), p4, giAnaOnOffs	;WRITE OUTPUT VALUE OF THE BUTTON THAT TRIGGERED THIS EVENT TO ANALOG ON/OFFs STATUS TABLE 
endin

instr	5	;WRITE TO DIGITAL ON/OFFS TABLE
	tableiw i(gkDigOnOff), p4, giDigOnOffs	;WRITE OUTPUT VALUE OF THE BUTTON THAT TRIGGERED THIS EVENT TO DIGITAL ON/OFFs STATUS TABLE
endin

</CsInstruments>

<CsScore>
i 1 0 3600	;READ IN OSC DATA
i 2 0 3600	;PRINT TO TERMINAL
i 3 0 3600	;DISPLAY USING FLTK WIDGETS
</CsScore>

</CsoundSynthesizer>
