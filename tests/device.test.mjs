import test from 'node:test';
import assert from 'node:assert/strict';
import 'fake-indexeddb/auto';
import {IDBObjectStore} from 'fake-indexeddb';
import {readState,writeState} from '../lib/device.ts';
import {validateBackup} from '../lib/care.ts';
globalThis.location={href:'https://test.local/commute-light-care/'};
test('device persistence, photos, atomic restore, stale tabs and write failures',async()=>{
 const original=await readState();assert.equal(original.revision,0);
 const draft=structuredClone(original);draft.diaries=[{id:'d',date:'2026-10-06',mood:'测试',energy:3,food:'一餐',activity:'散步',note:'完整保存',weight:null,photos:[{id:'p',data:'data:image/jpeg;base64,/9j/'}]}];
 const saved=await writeState(draft,0);assert.equal(saved.revision,1);assert.deepEqual(await readState(),saved);
 const backup=validateBackup(JSON.parse(JSON.stringify(saved)));assert.equal(backup.diaries[0].photos[0].data,draft.diaries[0].photos[0].data);
 await assert.rejects(writeState({...saved,diaries:[]},0),/另一个页面/);assert.deepEqual(await readState(),saved);
 const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(){throw new DOMException('quota','QuotaExceededError');};
 try{await assert.rejects(writeState({...saved,diaries:[]},1),/保存失败/);}finally{IDBObjectStore.prototype.put=put;}
 assert.deepEqual(await readState(),saved);assert.equal(draft.diaries[0].note,'完整保存');
 const deleted=await writeState({...saved,diaries:[]},1);assert.equal((await readState()).diaries.length,0);
 const restored=await writeState(backup,deleted.revision);assert.deepEqual((await readState()).diaries,backup.diaries);assert.equal(restored.revision,3);
});
