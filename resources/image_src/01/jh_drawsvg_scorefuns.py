

def vertLine(x,y,l=10,dir=1,stroke='black',stroke_width=1):
    y2 = y+l*dir
    return dw.Line(x,y,x,y2,stroke=stroke,stroke_width=stroke_width)

def note(x,y,y_space=10,**args):
    """eine note als verzogenes oval
    der xy punkt gibt den mittelpunkt an"""
    r = y_space
    path = dw.Path(**args)
    path.M(x,y-r*.3)
    path.C(x-r*.8,y-r*.4,x-r*.4,y+r*.2,x,y+r*.3)
    path.C(x+r*.8,y+r*.4,x+r*.4,y-r*.2,x,y-r*.3)
    return path

def viertel(x,y,h=10,dir=1,id=d):
    """x,y sind mittelpunkt
    h ist die höhe, also zwischenraum der notenlinien
    dir=1 ist hals nach oben, -1 nach unten"""
    x_rad = h*0.7
    y_rad = h*0.45
    x_pnt = x + h*0.67*dir
    y_pnt = y + h*0.17*dir
    l_pnt = h*2.5*dir
    id.append(dw.Ellipse(x,y,x_rad,y_rad,transform='rotate(-22,%f,%f)'%(x,-y)))
    id.append(dw.Line(x_pnt,y_pnt,x_pnt,y_pnt+l_pnt,stroke='black'))
        
def hilfslinien(p1=(0,0),n=3,l=20,yshift=10,sw=1):
    """p1 ist der erste punkt (quasi links unten)
    n ist die anzahl der hilslinien
    l ist die länge der linie(n)
    yshift ist der abstand"""
    strokeWidth(sw)
    x1,y = p1
    x2 = x1+l
    line(p1,(x2,y))
    for i in range(n-1):
        y += yshift
        line((x1,y),(x2,y))
        
def drawBranches(p1,p2,p3,p4):
    """zieht eine linie von p1 zu p2
    und von p2 zu p3
    und von p2 zu p4
    p2 ist also der punkt wo es sich verzweigt"""
    line(p1,p2)
    line(p2,p3)
    line(p2,p4)

def noteSystem(start,x_len=200,y_space=10,s=0,sw=0):
    """zieht ein fünfliniensystem"""
    if sw == 0: sw = sqrt(y_space) / 3
    x1,y1 = start
    stroke(s)
    strokeWidth(sw)
    for i in range(5):
        x2 = x1+x_len
        line((x1,y1),(x2,y1))
        y1 += y_space

def violinClef(start_system,y_space=10,s=0,sw=0,rnd=0):
    """start_system ist der punkt links unten wo das system startet
    rnd = 1 addiert zu jedem punkt der bezier kurve maximal eine abweichung
    von -1 bis 1 in x und y richtung"""
    if sw==0: sw = sqrt(y_space) 
    stroke(s)
    strokeWidth(sw)
    fill(None)
    x,y = start_system
    s = y_space
    p1 = (x+s*1.5,y+s/2)
    p2a,p2b,p2c = (x+s*2.2,y+s*3),(x+s*3.5,y),(x+s*2,y-s/4)
    p3a,p3b,p3c = (x+s,y-s/2),(x+s*.7,y),(x+s,y+s)
    p4a,p4b,p4c = (x+s*2,y+s*3),(x+s*2.1,y+s*3.5),(x+s*2.2,y+s*4.5)
    p5a,p5b,p5c = (x+s*2,y+s*5.5),(x+s*1.3,y+s*5),(x+s*1.4,y+s*4)
    p6a,p6b,p6c = (x+s*1.7,y+s*2),(x+s*1.5,y+s),(x+s*1.8,y-s)
    p7a,p7b,p7c = (x+s*1.6,y-s*2),(x+s*1.4,y-s*1.5),(x+s*1.6,y-s*1.1)
    
    from random import uniform
    p = [p2a,p2b,p2c,p3a,p3b,p3c,p4a,p4b,p4c,p5a,p5b,p5c,p6a,p6b,p6c,p7a,p7b,p7c]
    for i in range(len(p)):
        old = p[i]
        new = (x+uniform(-rnd,rnd) for x in old)
        p[i] = new
    
    path = BezierPath()
    path.moveTo(p1)
    path.curveTo(p[0],p[1],p[2])
    path.curveTo(p[3],p[4],p[5])
    path.curveTo(p[6],p[7],p[8])
    path.curveTo(p[9],p[10],p[11])
    path.curveTo(p[12],p[13],p[14])
    path.curveTo(p[15],p[16],p[17])
    drawPath(path)

def drawViolinClef_8(start_system,y_space=10,strwdth=2):
    """tief oktavierter violinschlüssel"""
    strokeWidth(strwdth)
    fill(None)
    x0,y0 = start_system
    path = BezierPath()
    path.moveTo((x0+20,y0+5))
    path.curveTo((x0+30,y0+30),(x0+40,y0),(x0+20,y0-5))
    path.curveTo((x0+5,y0-10),(x0+7,y0),(x0+10,y0+10))
    path.curveTo((x0+20,y0+30),(x0+23,y0+40),(x0+25,y0+50))
    path.curveTo((x0+21,y0+60),(x0+18,y0+55),(x0+15,y0+50))
    path.curveTo((x0+17,y0+20),(x0+15,y0+10),(x0+18,y0-10))
    path.curveTo((x0+14,y0-25),(x0+12,y0-20),(x0+15,y0-15))
    drawPath(path)
    font('LucidaGrande',14)
    strokeWidth(1)
    stroke(0)
    fill(0)
    text('8',(x0+11,y0-30))
    

def note_alt(p,y_space=10,s=0):
    """eine note als verzogenes oval
    p gibt den mittelpunkt an"""
    stroke(s)
    fill(s)
    x,y = p
    r = y_space
    path = BezierPath()
    path.moveTo((x,y-r*.3))
    path.curveTo((x-r*.8,y-r*.4),(x-r*.4,y+r*.2),(x,y+r*.3))
    path.curveTo((x+r*.8,y+r*.4),(x+r*.4,y-r*.2),(x,y-r*.3))
    drawPath(path)

def noteLeer(p,y_space=12,s=0):
    """eine note als verzogenes oval
    p gibt den mittelpunkt an"""
    stroke(s)
    fill(None)
    x,y = p
    r = y_space
    path = BezierPath()
    path.moveTo((x,y-r*.3))
    path.curveTo((x-r*.8,y-r*.4),(x-r*.4,y+r*.2),(x,y+r*.3))
    path.curveTo((x+r*.8,y+r*.4),(x+r*.4,y-r*.2),(x,y-r*.3))
    drawPath(path)

def quad(p,y_space=10):
    """eine note als quadrat
    p gibt den mittelpunkt an"""
    fill(None)
    x,y = p
    w = y_space
    rect(x-w/2,y-w/2,w,w)

def drawBdurum(x_note,y_note):
    """auflösezeichen"""
    #stroke(0)
    #strokeWidth(1.5)
    x,y = x_note,y_note
    line((x-15,y+20),(x-15,y)) #links senkrecht
    line((x-7,y+11),(x-7,y-8)) #rechts senkrecht
    line((x-15,y+7),(x-7,y+11)) #oben waagerecht
    line((x-15,y),(x-7,y+3))    #unten waagerecht

def drawBdurumFlage(x_note,y_note):
    """auflösezeichen für flageolette"""
    stroke(0)
    strokeWidth(1)
    x,y = x_note-4,y_note-1
    line((x-15,y+15),(x-15,y-4))
    line((x-10,y+5),(x-10,y-14))
    line((x-15,y+3),(x-10,y+5))
    line((x-15,y-4),(x-10,y-2))

def drawKreuz(x_note,y_note):
    #strokeWidth(1)
    #stroke(0)
    #fill(0)
    x = x_note-13
    line((x,y_note-10),(x,y_note+10))
    line((x+5,y_note-10),(x+5,y_note+10))
    line((x-3,y_note+1),(x+8,y_note+7))
    line((x-3,y_note-7),(x+8,y_note-1))

def drawSori(x_note,y_note):
    #strokeWidth(1)
    #stroke(0)
    #fill(0)
    x = x_note-13
    line((x,y_note-10),(x,y_note+10))
    line((x+4,y_note-10),(x+4,y_note+10))
    line((x-3,y_note+3),(x+8,y_note))
    line((x-3,y_note-5),(x+8,y_note))

def diesis(p_note,y_space=10,sw=0):
    if sw == 0: sw = sqrt(y_space) / 3
    strokeWidth(sw)
    x_note,y_note = p_note
    x = x_note-y_space*1.7
    line((x,y_note-y_space),(x,y_note+y_space))
    line((x+y_space/2,y_note-y_space),(x+y_space/2,y_note+y_space))
    line((x-y_space*.3,y_note+y_space*.1),(x+y_space*.8,y_note+y_space*.7))
    line((x-y_space*.3,y_note-y_space*.7),(x+y_space*.8,y_note-y_space*.1))

def drawKreuzFlage(x_note,y_note):
    strokeWidth(1)
    stroke(0)
    fill(0)
    x = x_note-19
    line((x,y_note+10),(x,y_note-10)) #oben unten links
    line((x+4,y_note+10),(x+4,y_note-10)) #oben unten rechts
    line((x-3,y_note),(x+8,y_note+5)) #links rechts oben
    line((x-3,y_note-5),(x+8,y_note)) #links rechts unten

def drawDiamond(x,y,w=8,h=8,sw=1.5):
    """x und y ist hier der mittelpunkt"""
    stroke(0)
    strokeWidth(sw)
    fill(0)
    line((x-w/2,y),(x,y+h/2))
    line((x,y+h/2),(x+w/2,y))
    line((x+w/2,y),(x,y-h/2))
    line((x,y-h/2),(x-w/2,y))

def drawBmolle(x_note,y_note):
    """normales b vorzeichen"""
    strokeWidth(1.5)
    stroke(0)
    fill(None)
    x,y = x_note,y_note-5
    path = BezierPath()
    path.moveTo((x-15,y))
    path.lineTo((x-15,y+20))
    path.moveTo((x-15,y))
    path.curveTo((x-5,y+5),(x-10,y+15),(x-15,y+5))
    drawPath(path)

def drawKoron(x_note,y_note):
    """koron vorzeichen"""
    strokeWidth(1.5)
    stroke(0)
    fill(None)
    x,y = x_note,y_note-5
    path = BezierPath()
    path.moveTo((x-15,y))
    path.lineTo((x-15,y-25))
    path.moveTo((x-15,y))
    path.lineTo((x-7,y-6))
    path.lineTo((x-15,y-12))
    drawPath(path)

def drawBmolleTief(x_note,y_note):
    """normales b vorzeichen"""
    fill(None)
    x,y = x_note,y_note-5
    path = BezierPath()
    path.moveTo((x-15,y))
    path.lineTo((x-15,y+20))
    path.moveTo((x-15,y))
    path.curveTo((x-5,y+5),(x-10,y+15),(x-15,y+5))
    path.moveTo((x-15,y))
    path.lineTo((x-15,y-10))
    path.lineTo((x-18,y-3))
    path.moveTo((x-15,y-10))
    path.lineTo((x-12,y-3))
    drawPath(path)
    
def drawGedaempft(x_note,y_note,y_dist=40):
    """das dämpfungszeichen"""
    r = 10
    fill(None)
    x = x_note+4
    oval(x-r/2,y_note+y_dist-r/2,r,r)
    line((x,y_note+y_dist+10),(x,y_note+y_dist-10))
    line((x-10,y_note+y_dist),(x+10,y_note+y_dist))
