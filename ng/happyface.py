import agentsim
from shape import *

class HappyFace(Shape):
    """
    HappyFace shape

    A HappyFace extends Shape by having a size, color, and number.
    
    Accessors for shape s (could eventually use properties)
    s.get_size()
    s.set_size(size)
        set the size of the face in pixels, min size of get_min_size()

    s.get_color()
    s.set_color(color)
        set the color of the face, either using a Tk color name
        string, like 'blue', or using a rgb value as returned by
            agentsim.rgb_to_color(r, g, b)
        where 0 <= r, g, b <= 255 for integer r, g, b

    s.get_number()
    s.set_number(v) 
        set the number level to v

    Visibility control - not normally used

    s.hide() makes the shape not visible on the screen
    s.show() makes the shape visible on the screen

    
    """

    def __init__(self,
        size=30,
        xpos=0,
        ypos=0,
        color='yellow',
        number=1,
        text_size = 10,
        allow_move = True,
        visible_num = True
        ):

        # initialize the parent class
        Shape.__init__(self, xpos=xpos, ypos=ypos)

        # set the object attributes
        self._number = number
        self._color = color
        self._size = min(self.get_max_size(), max(self.get_min_size(), size))
        self._text_size = text_size
        self._allow_move = allow_move
        self.visible_num = visible_num

        # remember the canvas that we are sitting in
        self._canvas = agentsim.gui.get_canvas()

        # true when selected by mouse
        self._selected = 0
        self._cursor_last_x = None
        self._cursor_last_y = None

        # all the component parts of the happyface
        self._parts = [ ]

        if agentsim.debug.get(4):
            print("HappyFace::New ", self, "at (",
                self.get_xpos(), ",", self.get_ypos(), ") size ",
                self.get_size(), "color", self.get_color(), "number",
                self.get_number())

    def get_size(self):
        return self._size

    def get_min_size(self):
        return 15

    def get_max_size(self):
        return 60

    def set_size(self, size):
        self._size = min(self.get_max_size(), max(self.get_min_size(), size))

        # only configure if there are graphic elements
        if self._gstate == Shape.DRAWN:
            self._configure()
        return self._size

    def get_number(self):
        return self._number

    def set_number(self, number):
        self._number = number

        # only configure if there are graphic elements
        if self._gstate == Shape.DRAWN:
            self._configure_smile()
        return self._number

    def get_color(self):
        return self._color

    def set_color(self, color):
        self._color = color
        # only configure if there are graphic elements
        if self._gstate == Shape.DRAWN:
            self._canvas.itemconfigure(self._id, fill=self._color)
        return self._color

    def _configure(self):
        """
        _configure adjusts the parameters of the drawn elements to reflect
        the current state of the shape.  
        Should not be called unless in the DRAWN graphics state.
        """
        (x_size, y_size) = agentsim.gui.get_canvas_size()
        (x_min, y_min, x_max, y_max) = agentsim.gui.get_canvas_coords()

        color = self.get_color()
        size = self.get_size()
        number = self.get_number()
        x_pos = self.get_xpos()
        y_pos = self.get_ypos()

        text_size = self._text_size

        # Tk canvas coordinate system
        c_x = x_pos - x_min
        c_y = y_pos - y_min

        (head, text) = self._parts[0:2]

        if agentsim.debug.get(4):
            print("Configuring ", self, ":", c_x, c_y, size)

        self._canvas.coords(head,
            c_x - size/2, c_y - size/2, c_x + size/2, c_y + size/2)

        text_x = size/5
        text_y = size/3

        self._canvas.coords(text,
            x_pos - text_x,
            y_pos - text_y
            )
        
        if self.visible_num == True:
            self._canvas.itemconfig(text, text=number)

    def draw(self):
        """
        override of base class draw method
        """
        if agentsim.debug.get(4):
            print("HappyFace:draw ", self, "_gstate", self._gstate)

        if self._gstate == Shape.DRAWN:
            return

        self._gstate = Shape.DRAWN

        if agentsim.debug.get(4):
            print("HappyFace::draw of", self)

        color = self.get_color()
        head = self._canvas.create_rectangle(
            0, 0, 0, 0,
            fill=color,
            )

        text = self._canvas.create_text(
            0, 0, anchor="nw"
            )


        self._parts.append(head)
        self._parts.append(text)

        # now we want to tag all of these elements with the same
        # tag so we can manipulate them
        self._id = "face" + str(head)

        for id in self._parts:
            self._canvas.addtag(self._id, 'withtag', id)

        if agentsim.debug.get(4):
            print("HappyFace::draw head", self._id, "parts", self._parts)

        # now actually configure the face
        self._configure()

        # attach some selection events
        def on_enter(ev):
            if not self._allow_move: return

            if agentsim.debug.get(1):
                print("enter", self, ev, self._id)
            # make the face red to show entering
            self._canvas.itemconfigure(self._parts[0], fill='red')

        self._canvas.tag_bind(self._id, '<Enter>', on_enter)

        def on_leave(ev):
            if not self._allow_move: return

            if self._selected:
                return
            if agentsim.debug.get(1):
                print("leave", self, ev, self._id)
            self._canvas.itemconfigure(self._parts[0], fill=self.get_color())

        self._canvas.tag_bind(self._id, '<Leave>', on_leave)

        def on_select(ev):
            if not self._allow_move: return

            self._selected = 1
            self._cursor_last_x = self._canvas.canvasx(ev.x)
            self._cursor_last_y = self._canvas.canvasy(ev.y)
            if agentsim.debug.get(1):
                print("select", self._id, ev.x, ev.y, 
                    self._cursor_last_x, self._cursor_last_y)

        self._canvas.tag_bind(self._id, '<Button-1>', on_select)

        def on_release(ev):
            if not self._allow_move: return

            self._selected = 0
            if agentsim.debug.get(1):
                print("release", self, ev, self._id)

        self._canvas.tag_bind(self._id, '<ButtonRelease-1>', on_release)

        def on_motion(ev):
            if not self._allow_move: return

            if self._selected:
                if agentsim.debug.get(1):
                    print("motion", self._id, ev.x, ev.y, 
                        self._cursor_last_x, self._cursor_last_y)

                cursor_x = self._canvas.canvasx(ev.x)
                cursor_y = self._canvas.canvasy(ev.y)
                self.move_by(cursor_x - self._cursor_last_x, 
                             cursor_y - self._cursor_last_y)
                self._cursor_last_x = cursor_x
                self._cursor_last_y = cursor_y

        self._canvas.tag_bind(self._id, '<Motion>', on_motion)
        

    def erase(self):
        """
        override of base class erase method

        It is still not clear if this is a safe operation, what happens
        if there are pending events on the components being erased?
        """
        if self._gstate == Shape.ERASED:
            return

        if agentsim.debug.get(4):
            print("HappyFace::erase of", self)

        for part in self._parts:
            self._canvas.delete(part)

        # remove elements from parts list
        self._parts = [ ]

        self._gstate = Shape.ERASED

        return self

    def move_by(self, delta_x, delta_y):
        """
        extension of base class move_by method
        """

        if agentsim.debug.get(4):
            print("HappyFace::move_by of", self, "at (", 
                self.get_xpos(), ",", self.get_ypos(), ") by (", 
                delta_x, ",", delta_y, ")")

        # current actual positions
        x_cur = self.get_xpos()
        y_cur = self.get_ypos()

        # move the position, clipping if necessary, using the base class
        # method, and updating xpos ypos
        super(HappyFace, self).move_by(delta_x, delta_y)

        # it may not be drawn, so at this point we are done
        if self._gstate != Shape.DRAWN:
            return

        if agentsim.debug.get(4):
            print("HappyFace:move_by", x_cur, y_cur)

        """
        We can do a tagged move here.  Instead of moving each individual
        part, move the collection as a whole, identified by its tag.  So

        for part in self._parts:
            self._canvas.move(part,
                self.get_xpos() - x_cur,
                self.get_ypos() - y_cur,
                )

        becomes
        """
        self._canvas.move(self._id,
            self.get_xpos() - x_cur,
            self.get_ypos() - y_cur,
            )

        return self 


    def hide(self):
        """
        same tagged operation, instead of

        for part in self._parts:
            self._canvas.itemconfigure(part, state='hidden')
        do
        """
        # it may not be drawn, so at this point we are done
        if self._gstate != Shape.DRAWN:
            return

        self._canvas.itemconfigure(self._id, state='hidden')

        return self 


    def show(self):
        # it may not be drawn, so at this point we are done
        if self._gstate != Shape.DRAWN:
            return

        self._canvas.itemconfigure(self._id, state='normal')

        return self 

