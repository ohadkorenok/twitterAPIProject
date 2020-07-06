const express = require('express');
const router = express.Router();
const model = require('../../models');
const Render_clip_worker = model.render_clip;
const Build = model.build;
const Event = model.event;
const Grab = model.grab;
const Zone = model.zone;
const Network = model.network;
const async = require("async");
const Op = require('sequelize').Op;
// const sleep = require('thread-sleep');
const cors = require('cors');
const config = require('../../config');

var corsOptions = {
  origin: config.origin,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.use(cors(corsOptions));
//get by id
router.get('/:id', (req, res, next) => {
    Render_clip_worker.findById(req.params.id).then(render_clip => {
        res.send(render_clip);
    }).catch(err =>  {
        res.sendStatus(500);

    })
});

//get render_clips by clip_name
router.get('/clip_name/:clip_name', (req, res, next) => {
    Render_clip_worker.findOne({where: {clip_name:req.params.clip_name}}).then(render_clip => {
        res.send(render_clip);
    }).catch(err =>  {
        res.sendStatus(500);

    })
});

//get all
router.get('/', (req, res, next) => {
    Render_clip_worker.findAll({
        include:[{ model:Build},{ model:Zone},{ model:Network}],
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset)

    }).then(render_clips => {
        res.send(render_clips);
    }).catch(err =>  {
        res.sendStatus(500);

    })
});

//insert
router.post('/', (req, res, next) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let create_time = req.body.creation_time;
    let clip_painted = req.body.clip_painted;
    let painting_start1 = req.body.painting_start1;
    if (!(painting_start1===null)) { clip_painted = true; }
    if (create_time===null) { create_time = timeNow; }
    Render_clip_worker.create(req.body).then(render_clip => {
        res.send(render_clip);
    }).catch(err =>  {
        console.log(err);
        res.sendStatus(500);
    });
});

//get render_clips by multiple build_id's
router.post('/build', (req, res, next) => {
    let dataArray = req.body.builds;
    let query = {
        include:[
            {model:Network},
            {model:Zone},
            {model:Build, include: [
                {model:Grab, include: [Event]}
                ]
            }
        ], 
        order: [
            ['created_date_time', 'DESC']
        ],
        limit: parseInt(req.body.limit),
        offset: parseInt(req.body.offset)
    };
    if (dataArray==null) {

    }
    else
    {
        let length = dataArray.length;
        let modifiedDataArray = [];

        for(let i =0;i<length;i++) {
            modifiedDataArray.push({"build_id":dataArray[i]});
        }
        query['where'] = {[Op.or]: modifiedDataArray};
    }

    Render_clip_worker.findAndCountAll(query).then(result => {
        res.send({'renderclips':result.rows,'count':result.count});
    }).catch(err =>  {
        res.sendStatus(500);

    })
});



//update
router.put('/', (req, res, next) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let create_time = req.body.creation_time;
    let clip_painted = req.body.clip_painted;
    let painting_start1 = req.body.painting_start1;
    if (req.body.created_date_time===null) { req.body.created_date_time = timeNow; }
    if (!(painting_start1===null)) { clip_painted = true; }
    // if (create_time===null) { create_time = timeNow; }
    // let dataArray = [];
    // console.log("render_clip", req.body);
    // dataArray.push(req.body);
    // Render_clip.bulkCreate(dataArray, 
    // {
    //     fields:["event_id", "build_id", "clip_number"],
    //     updateOnDuplicate: ["clip_name", "mark_id", "clip_number", "clip_type", "laser_wall", "clip_folder", "creation_time", "clip_painted", "painting_reason", "clip_sent", "clip_on_air", "game_play", "player_name", "start_camera", "end_camera", "build_to_clip_time", "created_date_time", "updated_date_time", "cam_mov_st", "cam_mov_fin", "matting_start", "matting_fin", "render_start", "render_fin", "reco_start", "reco_fin", "painting_start1", "painting_fin1", "painting_start2", "painting_fin2", "painting_start3", "painting_fin3", "zone_id", "recamera_reason", "action_type", "frame_delay", "path_name", "reason_not_found", "x", "y", "z", "render_freed_view_start", "render_freed_view_fin", "render_frame_convert_start", "render_frame_convert_fin", "color_match_start_a", "color_match_start_b", "color_match_fin", "convert_projection_start", "convert_projection_fin"] 
    // }).then(grab => {
    //     res.send(grab);
    // }).catch(err =>  {
    //     console.log(err);
    //     res.sendStatus(500);
    // });
    try {
        async.parallel({
            render_clip_lookup: function (cb) {
                // console.log("render_clip_lookup", req.body);
                if (req.body.clip_number<=1) {
                    cb(null, null);
                }
                else
                {
                    Render_clip_worker.findOne({where: {mark_id: {[Op.eq]: req.body.mark_id}}}).then(render_clip => {
                        cb(null, render_clip);
                        return null;
                    }).catch(err =>  {
                        console.log("err",err);
                        res.sendStatus(500);
                        return null;
                    });
                }
            }
        }, function (err, results) {
            // console.log("debug1");
            if (err) {
                console.log("err",err);
                res.sendStatus(500);
                return null;
            }
            // console.log("debug2");
            Render_clip_worker.findOne({where: {event_id: req.body.event_id, build_id: req.body.build_id, clip_number: req.body.clip_number}}).then(render_clip => {
                if (results.render_clip_lookup) {
                    req.body.action_type = results.render_clip_lookup.action_type;
                }
                if (render_clip)
                {
                    render_clip.update(req.body).then(render_clip => {
                            res.send(render_clip);
                    // console.log("render_clip new", render_clip);
                    }).catch(err =>  {
                        console.log("err",err);
                        res.sendStatus(500);
                        return null;
                    });
                }
                else
                {
                    Render_clip_worker.create(req.body).then(render_clip => {
                            res.send(render_clip);
                    }).catch(err =>  {
                        console.log("err",err);
                        res.sendStatus(500);
                        return null;
                    });
                }
                return null;
            }).catch(err =>  {
                console.log("err",err);
                res.sendStatus(500);
                return null;
            });
        });
    }
    catch(err) {
        console.log("err",err);
        res.sendStatus(500);
        return null;
    }
});

//update
router.put('/stadiums', (req, res, next) => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let pathName = req.body.path_name;
    let markId = req.body.mark_id;
    // sleep(30000);
    setTimeout(function(){ 
        Render_clip_worker.update(
        {
            updated_date_time: timeNow,
            path_name: pathName
        }, { where: { mark_id: markId, clip_folder: {[Op.or]: ["DynamicINIsBackup", "Clip"]} } }).then(clip => {
            if (clip[0]===0) { res.sendStatus(404); return; }
            // console.log("clip", clip);
            res.send({'id':clip[0]});
            // res.sendStatus(200);
        }).catch(err =>  {
            console.log("err", err);
            res.sendStatus(500);
        });
    }, 30000);
});

module.exports = router;
