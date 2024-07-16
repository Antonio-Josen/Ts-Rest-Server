import { Request, Response } from "express"
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
    const { body } = req;
    const usuario = await Usuario.findAll();

    res.json({
        msg: 'Get Usuarios',
        usuario
    })
}


export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;


    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json({
            msg: 'Get Usuarios',
            id,
            usuario
        })
    } else {
        res.status(404).json({
            msg: 'No Existe el Usuario'
        })

    }
}


export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })
        }

        const usuario = Usuario.create(body);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        await usuario.update( body );
        await usuario.save();
        console.log(usuario.update(body));
        res.json(usuario);

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if(!usuario){
        return res.status(404).json({
            msg: `No Existe un usuario con id: ${ id }`
        })
    }

    await usuario.update({estado: false});
    //await usuario.destroy();

    res.json({
        msg: 'Usuario Borrado',
        Usuario
    })
}












