module.exports = (sequelize, DataTypes) => {
  var Render_clip = sequelize.define('render_clip', 
    {        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clip_name: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        mark_id: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        clip_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        clip_type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        clip_type_str: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        laser_wall: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        clip_folder: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        creation_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        clip_painted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        painting_reason: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        multi_stich: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        clip_sent: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        clip_on_air: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        game_play: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        player_name: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        start_camera: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        end_camera: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        build_to_clip_time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_date_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_date_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        cam_mov_st: {
            type: DataTypes.DATE,
            allowNull: true
        },
        cam_mov_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        matting_start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        matting_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        render_start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        render_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        reco_start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        reco_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        painting_start1: {
            type: DataTypes.DATE,
            allowNull: true
        },
        painting_fin1: {
            type: DataTypes.DATE,
            allowNull: true
        },
        painting_start2: {
            type: DataTypes.DATE,
            allowNull: true
        },
        painting_fin2: {
            type: DataTypes.DATE,
            allowNull: true
        },
        painting_start3: {
            type: DataTypes.DATE,
            allowNull: true
        },
        painting_fin3: {
            type: DataTypes.DATE,
            allowNull: true
        },
        zone_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        recamera_reason: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        action_type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        frame_delay: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        path_name: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        reason_not_found: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        x: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        y: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        z: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        render_freed_view_start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        render_freed_view_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        render_frame_convert_start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        render_frame_convert_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        color_match_start_a: {
            type: DataTypes.DATE,
            allowNull: true
        },
        color_match_start_b: {
            type: DataTypes.DATE,
            allowNull: true
        },
        color_match_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        convert_projection_start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        convert_projection_fin: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        createdAt: false,
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ['event_id', 'build_id', 'clip_number']
            }
        ]
    }
  );

  Render_clip.associate = function (models) {
    models.render_clip.belongsTo(models.user, {foreignKey: {name:'created_user_id', allowNull: false}});
    models.render_clip.belongsTo(models.user, {foreignKey: {name:'updated_user_id', allowNull: true}});
    models.render_clip.belongsTo(models.network, {foreignKey: {name:'network_id', allowNull: true}});
    models.render_clip.belongsTo(models.build, {foreignKey: {name:'build_id', allowNull: false}});
    models.render_clip.belongsTo(models.zone, {foreignKey: {name:'zone_id', allowNull: true}});
    models.render_clip.hasMany(models.clip_camera, {foreignKey: {name:'render_clip_id', allowNull: true}});
    models.render_clip.belongsTo(models.event, {foreignKey: {name:'event_id', allowNull: false}});
    // models.render_clip.belongsTo(models.clip_camera, {foreignKey:  {name:'clip_camera_id', allowNull: true}});
  };

  return Render_clip;
};