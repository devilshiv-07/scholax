'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Import Students', href: '/admin/students/import' },
  { label: 'Manage Teachers', href: '/admin/teachers' },
  { label: 'View Students', href: '/admin/students' },
];

export default function ImportStudentsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [batch, setBatch] = useState('');
  const [section, setSection] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Single student form
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [singleName, setSingleName] = useState('');
  const [singleRegNo, setSingleRegNo] = useState('');
  const [singleBranch, setSingleBranch] = useState('');
  const [singleBatch, setSingleBatch] = useState('');
  const [singleSection, setSingleSection] = useState('');
  const [singleLoading, setSingleLoading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      
      if (['csv', 'xlsx', 'xls'].includes(fileExt || '')) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      
      if (['csv', 'xlsx', 'xls'].includes(fileExt || '')) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
      }
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a CSV file');
      return;
    }
    
    if (!batch || !section) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('batch', batch);
      formData.append('section', section);

      const response = await fetch('/api/admin/students/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to import students');
        return;
      }

      setSuccess(data.message);
      setSelectedFile(null);
      setBatch('');
      setSection('');
    } catch (err) {
      setError('Failed to import students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSingleLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/students/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: singleName,
          registrationNo: singleRegNo,
          branch: singleBranch,
          batch: singleBatch,
          section: singleSection,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to add student');
        return;
      }

      setSuccess(`Student ${data.student.name} added successfully!`);
      // Reset form
      setSingleName('');
      setSingleRegNo('');
      setSingleBranch('');
      setSingleBatch('');
      setSingleSection('');
      setShowSingleForm(false);
    } catch (err) {
      setError('Failed to add student. Please try again.');
    } finally {
      setSingleLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Import Students"
      userRole="admin"
      userName="Administrator"
      navItems={adminNavItems}
    >
      <div className="max-w-3xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary-900">Import Students</h2>
            <p className="text-gray-600 mt-2">Upload a CSV file or add students manually</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowSingleForm(!showSingleForm)}
          >
            {showSingleForm ? 'Cancel' : '+ Add Single Student'}
          </Button>
        </div>

        {/* Add Single Student Form */}
        {showSingleForm && (
          <form onSubmit={handleAddSingle} className="mb-6">
            <Card title="Add Single Student">
              <div className="space-y-4">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Enter student name"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Registration No."
                    type="text"
                    placeholder="e.g., 2024001"
                    value={singleRegNo}
                    onChange={(e) => setSingleRegNo(e.target.value)}
                    required
                  />
                  <Input
                    label="Branch"
                    type="text"
                    placeholder="e.g., CSE"
                    value={singleBranch}
                    onChange={(e) => setSingleBranch(e.target.value.toUpperCase())}
                    required
                  />
                </div>
                
                {/* Auto-generated Email Preview */}
                {(singleName || singleRegNo) && (
                  <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <strong>Email will be auto-generated:</strong>
                    </p>
                    <p className="text-primary-700 font-mono text-sm">
                      {singleName ? singleName.trim().split(' ')[0].toLowerCase() : 'firstname'}.{singleRegNo ? singleRegNo.toLowerCase() : 'regno'}@iiitranchi.ac.in
                    </p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Batch"
                    type="text"
                    placeholder="e.g., 2024"
                    value={singleBatch}
                    onChange={(e) => setSingleBatch(e.target.value)}
                    required
                  />
                  <Input
                    label="Section"
                    type="text"
                    placeholder="e.g., A"
                    value={singleSection}
                    onChange={(e) => setSingleSection(e.target.value.toUpperCase())}
                    maxLength={1}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={singleLoading}
                  className="w-full"
                >
                  {singleLoading ? 'Adding Student...' : 'Add Student'}
                </Button>
              </div>
            </Card>
          </form>
        )}

        {/* CSV Import Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            Or Import Multiple Students via CSV
          </h3>
        </div>

        <form onSubmit={handleImport} className="space-y-6">
          {/* CSV Format Info */}
          <Card title="CSV Format Requirements">
            <div className="space-y-4">
              {/* Download Template Button */}
              <div className="flex items-center justify-between p-3 bg-secondary-50 border border-secondary-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <p className="font-medium text-secondary-900">Download CSV Template</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Use this template to ensure correct format
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const csvContent = 'Name,Registration No.,Branch\nJohn Doe,2024001,CSE\nJane Smith,2024002,ECE\nAlex Johnson,2024003,IT';
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'student_import_template.csv';
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="btn-secondary text-sm"
                >
                  Download Template
                </button>
              </div>

              {/* Format Instructions */}
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-2">Required Columns (must match exactly):</p>
                <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs mb-3">
                  <div className="text-primary-700">Name,Registration No.,Branch</div>
                  <div className="text-gray-600 mt-1">John Doe,2024001,CSE</div>
                  <div className="text-gray-600">Jane Smith,2024002,ECE</div>
                  <div className="text-gray-600">Alex Johnson,2024003,IT</div>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <div>
                      <strong className="text-gray-900">Name</strong> - Full name of student
                      <span className="text-xs text-gray-500 block">Example: John Doe, Priya Singh</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <div>
                      <strong className="text-gray-900">Registration No.</strong> - Unique student ID
                      <span className="text-xs text-gray-500 block">Example: 2024001, 2024002</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-bold">•</span>
                    <div>
                      <strong className="text-gray-900">Branch</strong> - Department code
                      <span className="text-xs text-gray-500 block">Example: CSE, ECE, IT, EEE, MECH</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Auto-generated Info */}
              <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-primary-700 font-medium mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Auto-Generated Information:
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>• <strong>Email:</strong> <span className="font-mono text-primary-700">{'{firstname}'}.{'{regno}'}@iiitranchi.ac.in</span></p>
                  <p>• <strong>Batch & Section:</strong> Assigned from form below</p>
                  <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-primary-200">
                    Example: "John Doe" with regno "2024001" → <span className="font-mono text-primary-700">john.2024001@iiitranchi.ac.in</span>
                  </p>
                </div>
              </div>

              {/* Supported Formats */}
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Supported File Formats:
                </p>
                <div className="text-xs text-gray-700 space-y-1">
                  <p>• <strong>CSV</strong> (.csv) - Comma-separated values</p>
                  <p>• <strong>Excel</strong> (.xlsx, .xls) - Microsoft Excel files</p>
                  <p className="text-green-700 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <strong>Tip:</strong> You can upload Excel files directly - no conversion needed!
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Note: For Excel files, only the first sheet will be imported</p>
                </div>
              </div>

              {/* Important Notes */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Important Notes:
                </p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Column headers must be exactly: <span className="font-mono">Name,Registration No.,Branch</span></li>
                  <li>• No extra spaces in column names</li>
                  <li>• Registration numbers must be unique</li>
                  <li>• Maximum 100 students per import</li>
                  <li>• For Excel files, ensure data is in the first sheet</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* File Upload */}
          <Card title="Upload File (CSV or Excel)">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive
                  ? 'border-secondary-500 bg-secondary-50'
                  : 'border-gray-300 hover:border-secondary-400'
              }`}
            >
              <div className="text-5xl mb-4">📁</div>
              {selectedFile ? (
                <div>
                  <div className="text-5xl mb-3">
                    {selectedFile.name.endsWith('.csv') ? '📄' : '📊'}
                  </div>
                  <p className="text-primary-700 font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.name.split('.').pop()?.toUpperCase()}
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-3"
                    onClick={() => setSelectedFile(null)}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-2">
                    Drag and drop your CSV or Excel file here, or
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="btn-secondary cursor-pointer inline-block">
                      Browse Files
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-3">
                    Supported: CSV (.csv), Excel (.xlsx, .xls)
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Batch and Section */}
          <Card title="Assign Batch & Section">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Batch"
                type="text"
                placeholder="e.g., 2024"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
              />
              <Input
                label="Section"
                type="text"
                placeholder="e.g., A, B, C"
                value={section}
                onChange={(e) => setSection(e.target.value.toUpperCase())}
                maxLength={1}
                required
              />
            </div>
            <p className="text-sm text-gray-600 mt-3">
              These batch and section will be assigned to all students in the CSV file
            </p>
          </Card>

          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-danger">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-success">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-lg"
            disabled={loading}
          >
            {loading ? 'Importing Students...' : 'Import Students'}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

