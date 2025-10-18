import React, { useEffect, useState } from 'react';
import { saved } from '../api';

export default function SavedItems(){
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title:'', content:'' });

  const load = async () => {
    try {
      const res = await saved.list();
      setItems(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(()=>{ load(); }, []);

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({ title: item.title || '', content: item.content || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title:'', content:'' });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await saved.update(editingId, form);
      cancelEdit();
      load();
    } catch (err) { console.error(err); alert('Update failed'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete item?')) return;
    try {
      await saved.remove(id);
      load();
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  return (
    <div>
      <h2>Saved Items</h2>
      <div className="table">
        <div className="row header">
          <div className="cell">Type</div>
          <div className="cell">Title</div>
          <div className="cell">Content</div>
          <div className="cell">Date</div>
          <div className="cell">Actions</div>
        </div>

        {items.map(it => (
          <div key={it._id} className="row">
            <div className="cell">{it.type}</div>
            <div className="cell">{it.title}</div>
            <div className="cell">{it.content}</div>
            <div className="cell">{new Date(it.createdAt).toLocaleString()}</div>
            <div className="cell actions">
              <button onClick={()=> startEdit(it)}>Edit</button>
              <button onClick={()=> remove(it._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <form className="edit-form" onSubmit={submitEdit}>
          <h3>Edit</h3>
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" />
          <textarea value={form.content} onChange={e=>setForm({...form, content:e.target.value})} placeholder="Content" />
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
