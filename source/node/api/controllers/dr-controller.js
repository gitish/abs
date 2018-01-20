'use strict';
var mongoose = require('mongoose'),
    Dr = mongoose.model('dr');

exports.list_all_dr = function(req, res) {
    console.log("get call for all doctor");
    Dr.find({}, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};
exports.find_dr = function(req, res) {
    console.log("find Docutor ");
    var name=req.body.name;
    var regEx='.*'+name+'.*';
    Dr.find({"name": new RegExp(regEx, 'gi')}, function(err, result) {
        if (err) {
            res.send(err);
        }

        res.json(result);
    });
};
exports.get_dr = function(req, res) {
    console.log("get call for single doctor " + req.params.drId);
    Dr.find({drId:req.params.drId}, function(err, result) {
        if (err) {
            res.send(err);
        }

        res.json(result);
    });
};
exports.insert_new_dr = function(req, res) {
    var dr = new Dr(req.body);
    dr.last_updated = new Date();
    dr.save(function(err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    })
}

exports.update_a_dr = function(req, res) {
    req.body.last_updated=new Date();
    req.body.itemId=req.params.itemId;
    Dr.findOneAndUpdate({itemId:req.params.itemId}, req.body, {new: true}, function(err, item) {
        if (err)
            res.send(err);
        res.json({ message: "name updated" });
    });

    console.log("put call with requestId in path")
};

exports.delete_a_dr = function(req, res) {
    Dr.remove({
        itemId: req.params.taskId
    }, function(err, Dr) {
        if (err) {
            res.send(err);
        }
        res.json({ message: "Successful delete" });
    });
    console.log("delete call withe requestId in path")
};
/**
 * Created by sshail on 03/06/2017.
 */