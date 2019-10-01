import "reflect-metadata";
import {assert as assert} from 'chai';
import { DBColumn, DBTable } from "../../src";
import { RepresentationFactory } from '../../src/representationFactory';
import { Representation } from "../../src/representation";
import {Const} from "../../src/const";

describe('RepresentationFactory', function () 
{
    it('get() - no keys', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn()
            id:number = 123;

            @DBColumn()
            name:string = 'Some One';

            @DBColumn()
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 2);
        assert.equal(representations[0].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[0].range, `${Const.DefaultRangeValue}#undefined`);
        assert.equal(representations[0].objId, undefined);
        assert.equal(representations[0].data.hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[0].data.range, `${Const.DefaultRangeValue}#undefined`);
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.objid, undefined);
        assert.equal(representations[0].data.name, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 'now');

        assert.equal(representations[1].hash, undefined);
        assert.equal(representations[1].range, `${Const.DefaultRangeValue}`);
        assert.equal(representations[1].objId, undefined);
        assert.equal(representations[1].data.hash, undefined);
        assert.equal(representations[1].data.range, Const.DefaultRangeValue);
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.objid, undefined);
        assert.equal(representations[1].data.name, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 'now');
    });

    it('get() - id key', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({id:true})
            id:number = 123;

            @DBColumn({hash:true})
            name:string = 'Some One';

            @DBColumn()
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 3);
        assert.equal(representations[0].hash, 'entity#Some One');
        assert.equal(representations[0].range, 'nodenamo#123');
        assert.equal(representations[0].objId, 'entity#123');
        assert.equal(representations[0].data.hash, 'entity#Some One');
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.objid, 'entity#123');
        assert.equal(representations[0].data.name, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 'now');

        assert.equal(representations[1].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].range, `${Const.DefaultRangeValue}#123`);
        assert.equal(representations[1].objId, 'entity#123');
        assert.equal(representations[1].data.hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].data.range, `${Const.DefaultRangeValue}#123`);
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.objid, 'entity#123');
        assert.equal(representations[1].data.name, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 'now');

        assert.equal(representations[2].hash, `entity#123`);
        assert.equal(representations[2].range, `${Const.DefaultRangeValue}`);
        assert.equal(representations[2].objId, 'entity#123');
        assert.equal(representations[2].data.hash, `entity#123`);
        assert.equal(representations[2].data.range, Const.DefaultRangeValue);
        assert.equal(representations[2].data.id, 123);
        assert.equal(representations[2].data.objid, 'entity#123');
        assert.equal(representations[2].data.name, 'Some One');
        assert.equal(representations[2].data.createdTimestamp, 'now');
    });

    it('get() - a custom-named id key', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({name: 'newId', id:true})
            id:number = 123;

            @DBColumn({hash:true})
            name:string = 'Some One';

            @DBColumn()
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 3);
        assert.equal(representations[0].hash, 'entity#Some One');
        assert.equal(representations[0].range, 'nodenamo#123');
        assert.equal(representations[0].objId, 'entity#123');
        assert.equal(representations[0].data.hash, 'entity#Some One');
        assert.equal(representations[0].data.range, 'nodenamo#123');
        assert.equal(representations[0].data.newId, 123);
        assert.equal(representations[0].data.objid, 'entity#123');
        assert.equal(representations[0].data.name, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 'now');

        assert.equal(representations[1].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].range, `${Const.DefaultRangeValue}#123`);
        assert.equal(representations[1].objId, 'entity#123');
        assert.equal(representations[1].data.hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].data.range, `${Const.DefaultRangeValue}#123`);
        assert.equal(representations[1].data.newId, 123);
        assert.equal(representations[1].data.objid, 'entity#123');
        assert.equal(representations[1].data.name, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 'now');

        assert.equal(representations[2].hash, `entity#123`);
        assert.equal(representations[2].range, Const.DefaultRangeValue);
        assert.equal(representations[2].objId, 'entity#123');
        assert.equal(representations[2].data.hash, 'entity#123');
        assert.equal(representations[2].data.range, Const.DefaultRangeValue);
        assert.equal(representations[2].data.newId, 123);
        assert.equal(representations[2].data.objid, 'entity#123');
        assert.equal(representations[2].data.name, 'Some One');
        assert.equal(representations[2].data.createdTimestamp, 'now');
    });

    it('get() - hash and id', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:true, id:true})
            id:number = 123;

            @DBColumn()
            name:string = 'Some One';

            @DBColumn()
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 3);
        assert.isTrue(representations[0] instanceof Representation);
        assert.equal(representations[0].tableName, 'Entity');
        assert.equal(representations[0].hash, 'entity#123');
        assert.equal(representations[0].range, 'nodenamo#123');
        assert.equal(representations[0].objId, 'entity#123');
        assert.equal(representations[0].data.id, '123');
        assert.equal(representations[0].data.objid, 'entity#123');
        assert.equal(representations[0].data.name, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 'now');

        assert.isTrue(representations[1] instanceof Representation);
        assert.equal(representations[1].tableName, 'Entity');
        assert.equal(representations[1].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].range, `${Const.DefaultRangeValue}#123`);
        assert.equal(representations[1].objId, 'entity#123');
        assert.equal(representations[1].data.id, '123');
        assert.equal(representations[1].data.objid, 'entity#123');
        assert.equal(representations[1].data.name, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 'now');

        assert.isTrue(representations[2] instanceof Representation);
        assert.equal(representations[2].tableName, 'Entity');
        assert.equal(representations[2].hash, 'entity#123');
        assert.equal(representations[2].range, Const.DefaultRangeValue);
        assert.equal(representations[2].objId, 'entity#123');
        assert.equal(representations[2].data.id, '123');
        assert.equal(representations[2].data.objid, 'entity#123');
        assert.equal(representations[2].data.name, 'Some One');
        assert.equal(representations[2].data.createdTimestamp, 'now');
    });

    it('get() - hash only', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:true})
            id:number = 123;

            @DBColumn()
            name:string = 'Some One';

            @DBColumn()
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 3);
        assert.isTrue(representations[0] instanceof Representation);
        assert.equal(representations[0].tableName, 'Entity');
        assert.equal(representations[0].hash, 'entity#123');
        assert.equal(representations[0].range, 'nodenamo#undefined'); //no id
        assert.equal(representations[0].objId, undefined);
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.name, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 'now');

        assert.isTrue(representations[1] instanceof Representation);
        assert.equal(representations[1].tableName, 'Entity');
        assert.equal(representations[1].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].range, `${Const.DefaultRangeValue}#undefined`); //no id
        assert.equal(representations[1].objId, undefined);
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.name, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 'now');
        
        assert.isTrue(representations[2] instanceof Representation);
        assert.equal(representations[2].tableName, 'Entity');
        assert.equal(representations[2].hash, undefined);//no id
        assert.equal(representations[2].range, Const.DefaultRangeValue); 
        assert.equal(representations[2].objId, undefined);
        assert.equal(representations[2].data.id, 123);
        assert.equal(representations[2].data.name, 'Some One');
        assert.equal(representations[2].data.createdTimestamp, 'now');
    });

    it('get() - a hash/id and ranges', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:true,id:true})
            id:number = 123;

            @DBColumn({name: 'newName', range:true})
            name:string = 'Some One';

            @DBColumn({range:true})
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 5);
        assert.isTrue(representations[0] instanceof Representation);
        assert.equal(representations[0].hash, 'entity#123');
        assert.equal(representations[0].range, 'Some One');
        assert.equal(representations[0].objId, 'entity#123');
        assert.equal(representations[0].tableName, 'Entity');
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.newName, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 'now');
        assert.equal(representations[0].data.objid, 'entity#123');
        assert.equal(representations[0].data.hash, 'entity#123');
        assert.equal(representations[0].data.range, 'Some One');

        assert.isTrue(representations[1] instanceof Representation);
        assert.equal(representations[1].tableName, 'Entity');
        assert.equal(representations[1].hash, 'entity#123');
        assert.equal(representations[1].range, 'now');
        assert.equal(representations[1].objId, 'entity#123');
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.objid, 'entity#123');
        assert.equal(representations[1].data.newName, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 'now');

        assert.isTrue(representations[2] instanceof Representation);
        assert.equal(representations[2].tableName, 'Entity');
        assert.equal(representations[2].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[2].range, `Some One#123`);
        assert.equal(representations[2].objId, 'entity#123');
        assert.equal(representations[2].data.id, 123);
        assert.equal(representations[2].data.objid, 'entity#123');
        assert.equal(representations[2].data.newName, 'Some One');
        assert.equal(representations[2].data.createdTimestamp, 'now');

        assert.isTrue(representations[3] instanceof Representation);
        assert.equal(representations[3].tableName, 'Entity');
        assert.equal(representations[3].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[3].range, `now#123`);
        assert.equal(representations[3].objId, 'entity#123');
        assert.equal(representations[3].data.id, 123);
        assert.equal(representations[3].data.objid, 'entity#123');
        assert.equal(representations[3].data.newName, 'Some One');
        assert.equal(representations[3].data.createdTimestamp, 'now');
        
        assert.isTrue(representations[4] instanceof Representation);
        assert.equal(representations[4].tableName, 'Entity');
        assert.equal(representations[4].hash, 'entity#123');
        assert.equal(representations[4].range, Const.DefaultRangeValue);
        assert.equal(representations[4].objId, 'entity#123');
        assert.equal(representations[4].data.id, 123);
        assert.equal(representations[4].data.objid, 'entity#123');
        assert.equal(representations[4].data.newName, 'Some One');
        assert.equal(representations[4].data.createdTimestamp, 'now');
    });

    it('get() - a hash and ranges', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:true})
            id:number = 123;

            @DBColumn({name: 'newName', range:true})
            name:string = 'Some One';

            @DBColumn({range:true})
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 5);
        assert.isTrue(representations[0] instanceof Representation);
        assert.equal(representations[0].hash, 'entity#123');
        assert.equal(representations[0].range, 'Some One');
        assert.equal(representations[0].objId, undefined);
        assert.equal(representations[0].tableName, 'Entity');
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.newName, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 'now');
        assert.equal(representations[0].data.objId, undefined);
        assert.equal(representations[0].data.hash, 'entity#123');
        assert.equal(representations[0].data.range, 'Some One');

        assert.isTrue(representations[1] instanceof Representation);
        assert.equal(representations[1].tableName, 'Entity');
        assert.equal(representations[1].hash, 'entity#123');
        assert.equal(representations[1].range, 'now');
        assert.equal(representations[1].objId, undefined);
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.objid, undefined);
        assert.equal(representations[1].data.newName, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 'now');

        assert.isTrue(representations[2] instanceof Representation);
        assert.equal(representations[2].tableName, 'Entity');
        assert.equal(representations[2].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[2].range, `Some One#undefined`);
        assert.equal(representations[2].objId, undefined);
        assert.equal(representations[2].data.id, 123);
        assert.equal(representations[2].data.objid, undefined);
        assert.equal(representations[2].data.newName, 'Some One');
        assert.equal(representations[2].data.createdTimestamp, 'now');

        assert.isTrue(representations[3] instanceof Representation);
        assert.equal(representations[3].tableName, 'Entity');
        assert.equal(representations[3].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[3].range, `now#undefined`);
        assert.equal(representations[3].objId, undefined);
        assert.equal(representations[3].data.id, 123);
        assert.equal(representations[3].data.objid, undefined);
        assert.equal(representations[3].data.newName, 'Some One');
        assert.equal(representations[3].data.createdTimestamp, 'now');
        
        assert.isTrue(representations[4] instanceof Representation);
        assert.equal(representations[4].tableName, 'Entity');
        assert.equal(representations[4].hash, undefined);
        assert.equal(representations[4].range, Const.DefaultRangeValue);
        assert.equal(representations[4].objId, undefined);
        assert.equal(representations[4].data.id, 123);
        assert.equal(representations[4].data.objid, undefined);
        assert.equal(representations[4].data.newName, 'Some One');
        assert.equal(representations[4].data.createdTimestamp, 'now');
    });

    it('get() - hashes and ranges', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:true})
            id:number = 123;

            @DBColumn({hash:true})
            category:string = 'cat';

            @DBColumn({name: 'newName', range:true})
            name:string = 'Some One';

            @DBColumn({range:true})
            createdTimestamp:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 7);
        assert.equal(representations[0].hash, 'entity#123');
        assert.equal(representations[0].range, 'Some One');
        assert.equal(representations[1].hash, 'entity#123');
        assert.equal(representations[1].range, 'now');
        assert.equal(representations[2].hash, 'entity#cat');
        assert.equal(representations[2].range, 'Some One');
        assert.equal(representations[3].hash, 'entity#cat');
        assert.equal(representations[3].range, 'now');
        assert.equal(representations[4].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[4].range, `Some One#undefined`);
        assert.equal(representations[5].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[5].range, `now#undefined`);
        assert.equal(representations[6].hash, undefined);
        assert.equal(representations[6].range, Const.DefaultRangeValue);
    });
    
    it('get() - a hash-range pair', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:'key1'})
            id:number = 123;

            @DBColumn({name: 'newName', range:'key1'})
            name:string = 'Some One';
        };

        let representations:any = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 3);
        assert.equal(representations[0].hash, 'entity#123');
        assert.equal(representations[0].range, 'Some One');
        assert.equal(representations[0].tableName, 'Entity');
        assert.equal(representations[0].objId, undefined);
        assert.equal(representations[0].data.hash, 'entity#123');
        assert.equal(representations[0].data.range, 'Some One');
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.newName, 'Some One');

        assert.equal(representations[1].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].range, `${Const.DefaultRangeValue}#undefined`);
        assert.equal(representations[1].tableName, 'Entity');
        assert.equal(representations[1].objId, undefined);
        assert.equal(representations[1].data.hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].data.range, `${Const.DefaultRangeValue}#undefined`);
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.newName, 'Some One');

        assert.equal(representations[2].hash, undefined);
        assert.equal(representations[2].range, Const.DefaultRangeValue);
        assert.equal(representations[2].tableName, 'Entity');
        assert.equal(representations[2].objId, undefined);
        assert.equal(representations[2].data.hash, undefined);
        assert.equal(representations[2].data.range, Const.DefaultRangeValue);
        assert.equal(representations[2].data.id, 123);
        assert.equal(representations[2].data.newName, 'Some One');
    });

    it('get() - hash-range pairs', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:'key1'})
            id:number = 123;

            @DBColumn({range:'key1'})
            name:string = 'Some One';

            @DBColumn({hash:'key2'})
            category:string = 'cat';

            @DBColumn({range:'key2'})
            time:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 4);
        assert.equal(representations[0].hash, 'entity#123');
        assert.equal(representations[0].range, 'Some One');
        assert.equal(representations[0].objId, undefined);
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.objid, undefined);
        assert.equal(representations[0].data.name, 'Some One');
        assert.equal(representations[0].data.category, 'cat');
        assert.equal(representations[0].data.time, 'now');

        assert.equal(representations[1].hash, 'entity#cat');
        assert.equal(representations[1].range, 'now');
        assert.equal(representations[1].objId, undefined);
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.objid, undefined);
        assert.equal(representations[1].data.name, 'Some One');
        assert.equal(representations[1].data.category, 'cat');
        assert.equal(representations[1].data.time, 'now');

        assert.equal(representations[2].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[2].range, `${Const.DefaultRangeValue}#undefined`);
        assert.equal(representations[2].objId, undefined);
        assert.equal(representations[2].data.id, 123);
        assert.equal(representations[2].data.objid, undefined);
        assert.equal(representations[2].data.name, 'Some One');
        assert.equal(representations[2].data.category, 'cat');
        assert.equal(representations[2].data.time, 'now');

        assert.equal(representations[3].hash, undefined);
        assert.equal(representations[3].range, Const.DefaultRangeValue);
        assert.equal(representations[3].objId, undefined);
        assert.equal(representations[3].data.id, 123);
        assert.equal(representations[3].data.objid, undefined);
        assert.equal(representations[3].data.name, 'Some One');
        assert.equal(representations[3].data.category, 'cat');
        assert.equal(representations[3].data.time, 'now');
    });

    it('get() - a multiple-hashes/multiple-ranges pair', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:'key1', id:true})
            id:number = 123;

            @DBColumn({range:'key1'})
            name:string = 'Some One';

            @DBColumn({hash:'key1'})
            category:string = 'cat';

            @DBColumn({range:'key1'})
            time:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 3);
        assert.equal(representations[0].hash, 'entity#123#cat');
        assert.equal(representations[0].range, 'Some One#now');
        assert.equal(representations[1].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[1].range, `${Const.DefaultRangeValue}#123`);
        assert.equal(representations[2].hash, 'entity#123');
        assert.equal(representations[2].range, Const.DefaultRangeValue);
    });

    it('get() - a hash-range pair with regular hashes and ranges', function () 
    {
        @DBTable()
        class Entity {
            @DBColumn({hash:'key1', id:true})
            id:number = 123;

            @DBColumn({range:'key1'})
            name:string = 'Some One';

            @DBColumn({hash:true})
            category:string = 'cat';

            @DBColumn({range:true})
            time:string = 'now';
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 4);
        assert.equal(representations[0].hash, 'entity#cat');
        assert.equal(representations[0].range, 'now');
        assert.equal(representations[1].hash, 'entity#123');
        assert.equal(representations[1].range, 'Some One');
        assert.equal(representations[2].hash, `entity#${Const.DefaultHashValue}`);
        assert.equal(representations[2].range, `now#123`);
        assert.equal(representations[3].hash, 'entity#123');
        assert.equal(representations[3].range, Const.DefaultRangeValue);
    });

    it('get() - data prefix', function () 
    {
        @DBTable({dataPrefix:'pfx'})
        class Entity {
            @DBColumn({id:true})
            id:number = 123;

            @DBColumn({hash:true})
            name:string = 'Some One';

            @DBColumn({range:true})
            createdTimestamp:number = 234;
        };

        let representations = RepresentationFactory.get(new Entity());
        
        assert.equal(representations.length, 3);
        assert.equal(representations[0].hash, 'pfx#Some One');
        assert.equal(representations[0].range, 234);
        assert.equal(representations[0].objId, 'pfx#123');
        assert.equal(representations[0].data.hash, 'pfx#Some One');
        assert.equal(representations[0].data.range, 234);
        assert.equal(representations[0].data.id, 123);
        assert.equal(representations[0].data.objid, 'pfx#123');
        assert.equal(representations[0].data.name, 'Some One');
        assert.equal(representations[0].data.createdTimestamp, 234);

        assert.equal(representations[1].hash, `pfx#${Const.DefaultHashValue}`);
        assert.equal(representations[1].range, `234#123`);
        assert.equal(representations[1].objId, 'pfx#123');
        assert.equal(representations[1].data.hash, `pfx#${Const.DefaultHashValue}`);
        assert.equal(representations[1].data.range, `234#123`);
        assert.equal(representations[1].data.id, 123);
        assert.equal(representations[1].data.objid, 'pfx#123');
        assert.equal(representations[1].data.name, 'Some One');
        assert.equal(representations[1].data.createdTimestamp, 234);

        assert.equal(representations[2].hash, 'pfx#123');
        assert.equal(representations[2].range, Const.DefaultRangeValue);
        assert.equal(representations[2].objId, 'pfx#123');
        assert.equal(representations[2].data.hash, 'pfx#123');
        assert.equal(representations[2].data.range, Const.DefaultRangeValue);
        assert.equal(representations[2].data.id, 123);
        assert.equal(representations[2].data.objid, 'pfx#123');
        assert.equal(representations[2].data.name, 'Some One');
        assert.equal(representations[2].data.createdTimestamp, 234);
    });
});