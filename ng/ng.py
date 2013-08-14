import sys
import random

from person import Person

n_rows = 6
n_cols = 6
size = 60
halfsize = size/2

def do_repick():
    offset = agentsim.gui.get_range() - 1
    for row in range(2):
        for col in range(5):
            p = Person(haircolor='white', size=size, number = random.randint(
(offset + 1) * (offset + 1) , ((n_rows + offset) - 1) * ((n_cols + offset) - 1)))
            p.move_to(size + col * size, halfsize * 14 + row * size)



def do_init():

    # position everyone randomly about the canvas
    (x_min, y_min, x_max, y_max) = agentsim.gui.get_canvas_coords()

    offset = agentsim.gui.get_range() - 1
    
    for p in Person.get_all_instances():
       Person.del_instance(p) 

    # lays down the product tiles
    for row in range(1, n_rows):
        for col in range(1, n_cols):
            p = Person(haircolor='white', size=size, number=(row + offset)*(col + offset), allow_move = False, visible_num = False)
            p.move_to(halfsize + col * size, halfsize + row * size)
        
    # laying down the multiple tiles
    for row in range(1, n_rows):
        p = Person(haircolor='grey', size=size, number = row + offset, allow_move = False)
        p.move_to(size - halfsize, halfsize + row * size)
    
    for col in range(1, n_cols):
        p = Person(haircolor='grey', size=size, number = col + offset, allow_move = False)
        p.move_to(halfsize + col * size, size - halfsize)
    
    p = Person(haircolor ='grey', size=size, number = 3, allow_move = False, visible_num = False)
    p.move_to(halfsize, halfsize)    

    # places down the movable tiles at the bottom
    do_repick()
 
    # have all the people arrive at the simulation before we start
    for p in Person.get_all_instances():
        p.arrive()


def do_step():
    pass

def main():
    """
    process the command line arguments
    """

    # we update these when processing arguments, so they are made global
    global init_num_normals

    arg_debug = 0
    arg_i = 1
    while arg_i < len(sys.argv):
        arg = sys.argv[arg_i]
        if arg == "--debug":
            arg_i += 1
            arg_debug = int(sys.argv[arg_i])
        elif arg == "--normals":
            arg_i += 1
            init_num_normals = int(sys.argv[arg_i])
        else:
            raise(Exception("Unknown command line argument " + arg))
        # next argument
        arg_i += 1

    # instantiate the framework
    agentsim.init(title="Number Game", init_fn=do_init, step_fn=do_step, repick_fn = do_repick)

    agentsim.debug.set(arg_debug)
    agentsim.start()


if __name__ == "__main__":
    # if we don't have this conditional main body code, then pydoc3 gets
    # really cofused trying to partially run the code to extract out the
    # methods etc.

    # only bring in all the tk stuff when really running
    import agentsim

    main()
